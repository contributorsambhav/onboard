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

const feeRates = {
  bank: { outgoing: 30, incoming: 15, conversion: 3 }, // SWIFT fees (in USD)
  paypal: { transaction: 4.5, fixed: 0.3 },
  stripe: { transaction: 2.9, intl: 1 },
  wise: { min: 0.35, max: 2.85 },
  payoneer: { transaction: 3 },
};

export default function FeeCalculator() {
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

  return (
    <div className="flex gap-3 flex-col lg:flex-row">
      <div className="border rounded-md p-3 max-w-lg">
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
  );
}
