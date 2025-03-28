"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bitcoin, CreditCard, Wallet } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "../ui/button";
import { Info } from "lucide-react";
import TransactionDetails from "./transactionDetails";

export default function PaymentDashboard() {
  const [paymentMethod, setPaymentMethod] = useState("usdc");

  // TODO: change transaction details here
  const transactionDetails = {
    crypto: true,
    settlementTime: "2-5 business days",
    exchangeRate: 2.4,
  };
  return (
    <div className="border rounded p-4">
      <div>
        <h2 className="text-xl font-bold">Payment Dashboard</h2>
        <p className="text-neutral-500 text-sm">
          Send cross-border payments instantly using cryptocurrency
        </p>
      </div>
      <Tabs defaultValue="cryptocurrency" className="w-full">
        <TabsList className="w-full mt-2">
          {/* TODO: change this value here also */}
          <TabsTrigger value="cryptocurrency" className="cursor-pointer">
            <div className="flex items-center font-normal gap-1">
              <Bitcoin className="w-3" />
              <div>Cryptocurrency</div>
            </div>
          </TabsTrigger>
          {/* TODO: change this value prop here also */}
          <TabsTrigger value="traditional" className="cursor-pointer">
            {" "}
            <div className="flex font-normal items-center gap-1">
              <CreditCard className="w-3" />
              <div>Traditional Payment</div>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="cryptocurrency" className="mt-2 space-y-3">
          <div className="space-y-1">
            <Label>Amount to Send</Label>
            <Input
              placeholder="Enter amount"
              className="text-sm"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label>Select Cryptocurrency</Label>
            <div className="grid grid-cols-2 gap-2">
              <div
                className={clsx(
                  "h-28 flex flex-col duration-200 ease-out transition-all cursor-pointer justify-center items-center border-2 border-neutral-100 rounded-md",
                  {
                    "bg-neutral-100 border-0": paymentMethod === "usdc",
                  },
                )}
                onClick={() => setPaymentMethod("usdc")}
              >
                <div className="bg-blue-200 w-12 h-12 flex justify-center items-center rounded-full">
                  <Bitcoin className="w-10 text-blue-700" />
                </div>
                <div className="font-normal text-sm">USDC</div>
                <p className="text-neutral-500 text-xs">USD Stablecoin</p>
              </div>
              <div
                className={clsx(
                  "h-28 flex flex-col duration-200 ease-out transition-all cursor-pointer justify-center items-center border-2 border-neutral-100 rounded-md",
                  {
                    "bg-neutral-100": paymentMethod === "usdt",
                  },
                )}
                onClick={() => setPaymentMethod("usdt")}
              >
                <div className="bg-green-200 w-12 h-12 flex justify-center items-center rounded-full">
                  <Wallet className="w-10 text-green-700" />
                </div>
                <div className="font-normal text-sm">USDC</div>
                <p className="text-neutral-500 text-xs">USD Stablecoin</p>
              </div>
            </div>
          </div>
          {/* Render this on the basis of data */}
          {/* <TransactionDetails
            settlementTime={transactionDetails.settlementTime}
            exchangeRate={transactionDetails.exchangeRate}
            crypto={true}
          /> */}
          <div>
            <Button className="bg-blue-700 cursor-pointer hover:bg-blue-700 w-full">
              Send Payment
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="traditional" className="mt-2 space-y-3">
          <div className="space-y-1">
            <Label>Amount to Send</Label>
            <Input
              placeholder="Enter amount"
              className="text-sm"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label>Select Cryptocurrency</Label>
            <div className="grid grid-cols-2 gap-2">
              <div
                className={clsx(
                  "h-28 flex flex-col duration-200 ease-out transition-all cursor-pointer justify-center items-center border-2 border-neutral-100 rounded-md",
                  {
                    "bg-neutral-100": paymentMethod === "credit",
                  },
                )}
                onClick={() => setPaymentMethod("credit")}
              >
                <div className="bg-blue-200 w-12 h-12 flex justify-center items-center rounded-full">
                  <CreditCard className="w-10 text-blue-700" />
                </div>
                <div className="font-normal text-sm">Credit Card</div>
                <p className="text-neutral-500 text-xs">Visa/Mastercard</p>
              </div>
              <div
                className={clsx(
                  "h-28 flex flex-col duration-200 ease-out transition-all cursor-pointer justify-center items-center border-2 border-neutral-100 rounded-md",
                  {
                    "bg-neutral-100": paymentMethod === "debit",
                  },
                )}
                onClick={() => setPaymentMethod("debit")}
              >
                <div className="bg-green-200 w-12 h-12 flex justify-center items-center rounded-full">
                  <CreditCard className="w-10 text-green-700" />
                </div>
                <div className="font-normal text-sm">Debit Card</div>
                <p className="text-neutral-500 text-xs">Visa/Mastercard</p>
              </div>
            </div>
          </div>
          {/* Render this on the basis of data */}
          <TransactionDetails
            settlementTime={transactionDetails.settlementTime}
            exchangeRate={transactionDetails.exchangeRate}
            crypto={false}
          />
          <div>
            <Button className="bg-blue-700 cursor-pointer hover:bg-blue-700 w-full">
              Send Payment
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
