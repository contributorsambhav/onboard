"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const feeRates = {
  bank: { outgoing: 30, incoming: 15, conversion: 3 }, // SWIFT fees (in USD)
  paypal: { transaction: 4.5, fixed: 0.3 },
  stripe: { transaction: 2.9, intl: 1 },
  wise: { min: 0.35, max: 2.85 },
  payoneer: { transaction: 3 },
};

export default function Fiatstimate() {
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
        <Button onClick={calculateFee} className="w-full">
          Estimate Fee
        </Button>
        {fee > 0 && (
          <div className="font-semibold text-green-600">
            Estimated Fee: ${fee}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
