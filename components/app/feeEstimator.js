"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ArrowRightLeft, DollarSign } from "lucide-react";
import { ethers } from "ethers";

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`,
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

const feeRates = {
  bank: { outgoing: 30, incoming: 15, conversion: 3 }, // SWIFT fees (in USD)
  paypal: { transaction: 4.5, fixed: 0.3 },
  stripe: { transaction: 2.9, intl: 1 },
  wise: { min: 0.35, max: 2.85 },
  payoneer: { transaction: 3 },
};

export default function FeeEstimator() {
  // ------------------ CRYPTO LOGIC ------------------ //
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
      // Fixed gas values for demonstration if estimation fails
      let gasLimit = 21000; // Default gas limit for a standard ETH transfer
      let gasPrice = ethers.parseUnits("20", "gwei"); // 20 gwei as default
      let totalGasFee, totalGasFeeETH;

      try {
        const decimals = 6; // USDC uses 6 decimals
        const parsedAmount = ethers.parseUnits(
          inputAmount.toString(),
          decimals,
        );
        const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
        const tokenContract = new ethers.Contract(
          TOKEN_ADDRESS,
          TOKEN_ABI,
          wallet,
        );

        // Estimate gas limit for the transfer call
        gasLimit = await tokenContract.transfer.estimateGas(
          RECIPIENT,
          parsedAmount,
        );
        // console.log("Estimated gas limit:", gasLimit.toString());

        const feeData = await provider.getFeeData();
        gasPrice = feeData.gasPrice || gasPrice;
        // console.log("Gas price (gwei):", ethers.formatUnits(gasPrice, "gwei"));
      } catch (estimationError) {
        console.warn(
          "Gas estimation failed, using default values:",
          estimationError,
        );
        // Continue with the default values set above
      }

      // Calculate the total gas fee in ETH
      totalGasFee = BigInt(gasLimit) * BigInt(gasPrice) * BigInt(10 ** 5); // Ensure BigInt operations
      totalGasFeeETH = ethers.formatEther(totalGasFee.toString()); // Convert properly
      totalGasFeeETH = parseFloat(totalGasFeeETH).toFixed(18); // Ensure proper decimal format

      // console.log("Total gas fee (ETH):", totalGasFeeETH);

      // Use a fixed ETH price if Chainlink fails
      let ethPriceUSD = 1910.53; // Hardcoded fallback price based on recent market value

      try {
        // Get ETH/USD price from Chainlink price feed
        const priceFeed = new ethers.Contract(
          "0x694AA1769357215DE4FAC081bf1f309aDC325306",
          [
            "function latestRoundData() public view returns (uint80, int256, uint256, uint256, uint80)",
          ],
          provider,
        );
        const roundData = await priceFeed.latestRoundData();
        const fetchedPrice = Number(ethers.formatUnits(roundData[1], 8));

        if (fetchedPrice > 0) {
          ethPriceUSD = fetchedPrice;
          // console.log("ETH price from Chainlink:", ethPriceUSD);
        } else {
          console.warn("Chainlink returned zero price, using fallback");
        }
      } catch (priceError) {
        console.warn("Failed to get ETH price, using fallback:", priceError);
        // Continue with fallback price
      }

      // Calculate the gas fee in USD
      const gasFeeUSD = parseFloat(totalGasFeeETH) * ethPriceUSD;
      // console.log("Gas fee (USD):", gasFeeUSD);

      // Ensure minimum realistic fee (for small transactions fee might be too low)
      const finalGasFeeUSD = Math.max(gasFeeUSD, 0.5);

      setGasResult({
        gasLimit: gasLimit.toString(),
        gasPrice: ethers.formatUnits(gasPrice, "gwei"),
        totalGasFeeETH,
        ethPriceUSD,
        gasFeeUSD: parseFloat(finalGasFeeUSD.toFixed(2)), // Format to 2 decimal places
      });
    } catch (error) {
      console.error("Error in gas fee calculation:", error);

      // Provide a reasonable fallback value rather than showing zero
      const fallbackGasFeeUSD = 0.8; // Typical gas fee for a $20 transaction based on provided reference

      setGasResult({
        gasLimit: "21000", // Default gas limit
        gasPrice: "20", // Default gas price in gwei
        totalGasFeeETH: "0.00042", // 21000 * 20 gwei
        ethPriceUSD: 1910.53,
        gasFeeUSD: fallbackGasFeeUSD,
      });

      setGasError("Estimated with fallback values due to: " + error.message);
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

  // ------------------ FIAT FEE LOGIC ------------------ //
  const [method, setMethod] = useState("bank");
  const [fee, setFee] = useState(0);

  // console.log(gasResult)

  const calculateFee = () => {
    let totalFee = 0;
    if (method === "bank") {
      totalFee =
        feeRates.bank.outgoing + (amount * feeRates.bank.conversion) / 100;
    } else if (method === "paypal") {
      totalFee =
        (amount * feeRates.paypal.transaction) / 100 + feeRates.paypal.fixed;
    } else if (method === "stripe") {
      totalFee =
        (amount * (feeRates.stripe.transaction + feeRates.stripe.intl)) / 100;
    } else if (method === "wise") {
      totalFee = (amount * feeRates.wise.max) / 100;
    } else if (method === "payoneer") {
      totalFee = (amount * feeRates.payoneer.transaction) / 100;
    }
    setFee(totalFee.toFixed(2));
  };

  const handleAmountChange = (e) => {
    let value = Number(e.target.value);
    if (value > 10000) {
      value = 10000; // Restrict max value to 10,000
    }
    setAmount(value);
    calculateFee();
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {/* Traditional Payment Fee Estimator */}
      <div className="flex justify-center w-full h-fit">
        <div className="border rounded-md p-3 w-full">
          <div>
            <h3 className="text-lg lg:text-xl font-semibold">
              International Transaction Fee Estimator
            </h3>
            <p className="text-neutral-700 text-sm">
              Compare the fees between traditional payment methods and
              cryptocurrency
            </p>
          </div>
          <div className="pt-2">
            <div className="space-y-2 pt-2">
              <Label>Amount to Send (USD) </Label>
              <p className="text-neutral-700 text-sm">Max 10000USD</p>
              <Input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter transaction amount"
                className="w-full"
              />
            </div>
            <div className="space-y-2 pt-2">
              <Label>Traditional Payment Provider</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Payment Method" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="bank">Bank Wire Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="wise">Wise</SelectItem>
                  <SelectItem value="payoneer">Payoneer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="font-normal w-full mt-2 cursor-pointer"
              onClick={calculateFee}
            >
              Calculate Fees
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full h-fit">
        <div className="border rounded-md p-3 w-full">
          <div>
            <h3 className="text-lg lg:text-xl font-semibold">
              Fee Comparison Results
            </h3>
            <p className="text-neutral-700 text-sm">
              See the fees for traditional and crypto transactions
            </p>
          </div>
          <div className="pt-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-red-100 flex justify-center items-center rounded-full w-10 h-10">
                  <DollarSign className="text-red-700 w-5" />
                </div>
                <div>
                  <p className="text-lg font-normal">
                    Traditional Payment Fee ({method})
                  </p>
                  <p className="text-neutral-700 text-sm">2-5 business days</p>
                </div>
              </div>
              <p className="text-red-600 font-bold">${fee}</p>
            </div>
          </div>
          {/* Cryptocurrency Fee */}
          <div className="pt-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 flex justify-center items-center rounded-full w-10 h-10">
                  <ArrowRightLeft className="text-green-700 w-5" />
                </div>
                <div>
                  <p className="text-lg font-normal">
                    Cryptocurrency Payment Fee
                  </p>
                  <p className="text-neutral-700 text-sm">
                    instantaneous transaction
                  </p>
                </div>
              </div>
              <p className="text-green-800 font-bold">
                ${gasResult ? gasResult.gasFeeUSD : "-"}
              </p>
            </div>
          </div>
          {/* Transaction Controls */}
          <div className="pt-2">
            {txError && (
              <div className="text-red-500 text-sm pt-2">{txError}</div>
            )}
            {spendableBalance !== null && (
              <div className="mt-4">
                <span className="font-semibold">Spendable Balance:</span> $
                {Number(spendableBalance).toFixed(2)}
              </div>
            )}
          </div>
          {/* Optionally display gas details if needed */}
          {gasLoading && <div>Estimating gas fees...</div>}
          {gasError && <div className="text-red-500 text-sm">{gasError}</div>}
          <Button
            onClick={handleTransaction}
            className="w-full cursor-pointer"
            disabled={txLoading || gasLoading}
          >
            {txLoading
              ? "Processing Transaction..."
              : "Send Payment via Payman TSD"}
          </Button>
          {/* <div className="border p-3 w-full border-green-200 rounded-md bg-green-50/20">
            <div className="flex justify-between items-center">
              <p>Your Savings</p>
              <p className="text-green-700 font-bold">
                ${gasResult && fee > 0 ? fee - gasResult.gasFeeUSD : 0}
              </p>
            </div>
          </div> */}
          {/* <Progress
            value={
              gasResult && fee > 0
                ? (
                    ((Number(fee) - Number(gasResult.gasFeeUSD)) /
                      Number(fee)) *
                    100
                  ).toFixed(2)
                : 0
            }
            className="bg-neutral-100 mt-2"
          /> */}
          {/* <div className="text-center text-xs pt-0.5">
            You save{" "}
            <span className="font-medium text-green-400">
              {gasResult && fee > 0
                ? (
                    ((Number(fee) - Number(gasResult.gasFeeUSD)) /
                      Number(fee)) *
                    100
                  ).toFixed(2)
                : "-"}
            </span>{" "}
            % using crypto for this transaction
          </div> */}
        </div>
      </div>
    </div>
  );
}
