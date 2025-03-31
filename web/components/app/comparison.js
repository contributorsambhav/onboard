import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { CheckCircle, Clock, DollarSign, Globe, Lock, X } from "lucide-react";

export default function Comparison() {
  const benefits = [
    {
      title: "Lower Transaction Fees",
      description:
        "Crypto transactions typically have significantly lower fees than traditional bank transfers, especially for international payments.",
      icon: DollarSign,
      cryptoAdvantage: "0.1% - 1% fee",
      fiatDisadvantage: "3% - 5% fee + FX markup",
    },
    {
      title: "Faster Settlement",
      description:
        "Cryptocurrency transactions settle within minutes or even seconds, compared to days for international wire transfers.",
      icon: Clock,
      cryptoAdvantage: "Minutes or seconds",
      fiatDisadvantage: "2-5 business days",
    },
    {
      title: "24/7 Operation",
      description:
        "Crypto markets operate continuously without banking hours or holidays, allowing for transactions any time.",
      icon: Globe,
      cryptoAdvantage: "24/7/365 availability",
      fiatDisadvantage: "Limited by banking hours",
    },
    {
      title: "No Intermediaries",
      description:
        "Direct peer-to-peer transactions without the need for intermediary banks or financial institutions.",
      icon: Lock,
      cryptoAdvantage: "Direct P2P transfers",
      fiatDisadvantage: "Multiple intermediaries",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2">
      {benefits.map((benefit, index) => (
        <div
          key={benefit.title}
          className={clsx("", {
            "border-b md:border-r md:border-b": index === 0,
            "border-b md:border-b": index === 1,
            "md:border-r": index === 2,
            "": index === 3,
          })}
        >
          <div className="p-4 bg-gradient-to-r from-neutral-50 ">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary-50 rounded-full">
                <benefit.icon className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-xl text-neutral-800">
                {benefit.title}
              </h3>
            </div>
            <p className="text-neutral-600 text-sm">{benefit.description}</p>
          </div>
          <div className="p-4 grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 shadow-sm hover:shadow transition-shadow duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-green-100 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-sm text-green-800">
                  Crypto
                </span>
              </div>
              <p className="text-sm font-medium text-green-700 pl-1">
                {benefit.cryptoAdvantage}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200 shadow-sm hover:shadow transition-shadow duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-red-100 rounded-full">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <span className="font-medium text-sm text-red-800">Fiat</span>
              </div>
              <p className="text-sm font-medium text-red-700 pl-1">
                {benefit.fiatDisadvantage}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
