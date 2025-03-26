"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ----- FIAT FEE ESTIMATOR ----- //

const feeRates = {
  bank: { outgoing: 30, incoming: 15, conversion: 3 }, // SWIFT fees (in USD)
  paypal: { transaction: 4.5, fixed: 0.3 },
  stripe: { transaction: 2.9, intl: 1 },
  wise: { min: 0.35, max: 2.85 },
  payoneer: { transaction: 3 },
};

function Fiatstimate() {
  const [amount, setAmount] = useState(1000);
  const [method, setMethod] = useState("bank");
  const [fee, setFee] = useState(0);

  const calculateFee = () => {
    let totalFee = 0;
    if (method === "bank") {
      totalFee = feeRates.bank.outgoing + (amount * feeRates.bank.conversion) / 100;
    } else if (method === "paypal") {
      totalFee = (amount * feeRates.paypal.transaction) / 100 + feeRates.paypal.fixed;
    } else if (method === "stripe") {
      totalFee = (amount * (feeRates.stripe.transaction + feeRates.stripe.intl)) / 100;
    } else if (method === "wise") {
      totalFee = (amount * feeRates.wise.max) / 100;
    } else if (method === "payoneer") {
      totalFee = (amount * feeRates.payoneer.transaction) / 100;
    }
    setFee(totalFee.toFixed(2));
  };

  return (
    <Card className="w-full max-w-lg mx-auto p-6">
      <CardHeader>
        <CardTitle>International Transaction Fee Estimator</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter transaction amount"
          className="w-full"
        />
        <Select value={method} onValueChange={setMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bank">Bank Wire Transfer</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="stripe">Stripe</SelectItem>
            <SelectItem value="wise">Wise</SelectItem>
            <SelectItem value="payoneer">Payoneer</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={calculateFee} className="w-full">
          Estimate Fee
        </Button>
        {fee > 0 && (
          <div className="text-lg font-semibold text-green-600">
            Estimated Fee: ${fee}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ----- CRYPTO PAYMENT DASHBOARD ----- //

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`
);
const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS; // e.g., "0xYourUSDCAddress"
const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY; // WARNING: Do not expose private keys in production!

// USDC ABI (truncated)
const TOKEN_ABI = [
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

// Replace with the actual recipient address
const RECIPIENT = "0xFC328F567A3720233E507D2C29711232eD79b99c";

function TransactionDashboard() {
  const [amount, setAmount] = useState("");
  const [gasLoading, setGasLoading] = useState(false);
  const [gasResult, setGasResult] = useState(null);
  const [gasError, setGasError] = useState("");

  const [txLoading, setTxLoading] = useState(false);
  const [txError, setTxError] = useState("");
  const [spendableBalance, setSpendableBalance] = useState(null);

  // Estimate gas fee for a given amount (for USDC transfer)
  const estimateGasFee = async (inputAmount) => {
    if (!inputAmount || isNaN(inputAmount) || Number(inputAmount) <= 0) {
      setGasResult(null);
      return;
    }
    setGasLoading(true);
    setGasError("");
    try {
      const decimals = 6; // USDC uses 6 decimals
      const parsedAmount = ethers.parseUnits(inputAmount.toString(), decimals);
      const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
      const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, wallet);

      // Estimate gas limit for the transfer call
      const gasLimit = await tokenContract.transfer.estimateGas(
        RECIPIENT,
        parsedAmount
      );
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice;

      // Calculate the total gas fee in ETH
      const totalGasFee = gasLimit * gasPrice;
      const totalGasFeeETH = ethers.formatEther(totalGasFee);

      // Get ETH/USD price from Chainlink price feed (Sepolia example)
      const priceFeed = new ethers.Contract(
        "0x694AA1769357215DE4FAC081bf1f309aDC325306",
        [
          "function latestRoundData() public view returns (uint80, int256, uint256, uint256, uint80)",
        ],
        provider
      );
      const roundData = await priceFeed.latestRoundData();
      const ethPriceUSD = Number(ethers.formatUnits(roundData[1], 8));
      const gasFeeUSD = (Number(totalGasFeeETH) * ethPriceUSD).toFixed(2);

      setGasResult({
        gasLimit: gasLimit.toString(),
        gasPrice: ethers.formatUnits(gasPrice, "gwei"),
        totalGasFeeETH,
        gasFeeUSD,
      });
    } catch (error) {
      console.error("Error estimating gas fees:", error);
      setGasError("Error estimating gas fees. See console for details.");
    }
    setGasLoading(false);
  };

  // Trigger gas estimation whenever the input amount changes
  useEffect(() => {
    if (amount) {
      estimateGasFee(amount);
    } else {
      setGasResult(null);
    }
  }, [amount]);

  // Handle the Payman transaction by calling the server-side API route.
  // For conceptual purposes, we add the estimated gas fee (in USD) to the payment amount.
  const handleTransaction = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setTxError("Please enter a valid amount.");
      return;
    }
    if (!gasResult) {
      setTxError("Gas fee has not been estimated yet.");
      return;
    }
    setTxLoading(true);
    setTxError("");
    setSpendableBalance(null);
    try {
      const res = await fetch("/api/payman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountDecimal: Number(amount) + Number(gasResult.gasFeeUSD), // dynamic payment amount including gas fee
          payeeId: "pd-1f009380-1112-6a45-9ce3-ff7ca7c48292", // example payee id
          memo: "Invoice #1234",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Transaction failed");
      }
      // Update spendable balance from the API response
      setSpendableBalance(data.spendableBalance);
    } catch (error) {
      console.error("Error processing Payman transaction:", error);
      setTxError("Transaction failed. See console for details.");
    }
    setTxLoading(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 mt-10 space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Payment Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter USDC amount"
          className="w-full"
        />
        {gasLoading && <div>Estimating gas fees...</div>}
        {gasError && <div className="text-red-500 text-sm">{gasError}</div>}
        {gasResult && (
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Estimated Gas Limit:</span> {gasResult.gasLimit} gas units
            </div>
            <div>
              <span className="font-semibold">Gas Price:</span> {gasResult.gasPrice} gwei
            </div>
            <div>
              <span className="font-semibold">Total Gas Fee:</span> {gasResult.totalGasFeeETH} ETH (${gasResult.gasFeeUSD})
            </div>
            <div>
              <span className="font-semibold">Total Deduction:</span> {amount} USDC + {gasResult.totalGasFeeETH} ETH (${gasResult.gasFeeUSD})
            </div>
          </div>
        )}
        <Button onClick={handleTransaction} disabled={txLoading || gasLoading}>
          {txLoading ? "Processing Transaction..." : "Send Payment"}
        </Button>
        {txError && <div className="text-red-500 text-sm">{txError}</div>}
        {spendableBalance !== null && (
          <div className="mt-4">
            <span className="font-semibold">Spendable Balance:</span> ${Number(spendableBalance).toFixed(2)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ----- COMBINED DASHBOARD ----- //

export default function CombinedDashboard() {
  return (
    <div className="space-y-10">
      <Fiatstimate />
      <TransactionDashboard />
    </div>
  );
}
