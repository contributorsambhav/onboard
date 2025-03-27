"use client";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ArrowRightLeft, DollarSign } from "lucide-react";
import { Progress } from "../ui/progress";

const feeRates = {
  bank: { outgoing: 30, incoming: 15, conversion: 3 }, // SWIFT fees (in USD)
  paypal: { transaction: 4.5, fixed: 0.3 },
  stripe: { transaction: 2.9, intl: 1 },
  wise: { min: 0.35, max: 2.85 },
  payoneer: { transaction: 3 },
};

export default function FeeEstimator() {
  const [amount, setAmount] = useState(1000);
  const [method, setMethod] = useState("bank");
  const [fee, setFee] = useState(0);

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

  console.log(fee);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="flex justify-center w-full">
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
              <Label>Amount to Send (USD)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
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
              See how much you could save using cryptocurrency
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
                    Traditional Payment Method ({method})
                  </p>
                  <p className="text-neutral-700 text-sm">2-5 business days</p>
                </div>
              </div>
              <p className="text-red-600 font-bold">${amount + fee}</p>
            </div>
          </div>
          <div className="pt-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 flex justify-center items-center rounded-full w-10 h-10">
                  <ArrowRightLeft className="text-green-700 w-5" />
                </div>
                <div>
                  <p className="text-lg font-normal">Cryptocurrency Payment</p>
                  <p className="text-neutral-700 text-sm">2-5 business days</p>
                </div>
              </div>
              <p className="text-green-800 font-bold">${fee}</p>
            </div>
          </div>
          <div className="pt-2">
            <div className="border p-3 w-full border-green-200 rounded-md bg-green-50/20">
              <div className="flex justify-between items-center">
                <p>Your Savings</p>
                <p className="text-green-700 font-bold">${amount}</p>
              </div>
              {/* TODO: change this value make this dynamic */}
              <Progress value={33} className="bg-neutral-100 mt-2" />
              <div className="text-center text-xs pt-0.5">
                {/* TODO: Make percentage dynamic here   */}
                You save <span className="font-medium text-green-400">
                  91%
                </span>{" "}
                using crypto for this transaction
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
