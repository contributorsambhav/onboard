import { Button } from "@/components/ui/button";
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
    <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-2">
      {benefits.map((benefit) => (
        <div key={benefit.title} className="border rounded">
          <div className="p-3 bg-neutral-100/80 rounded-t border-b">
            <div className="flex items-center gap-2">
              <benefit.icon className="w-5 h-5 text-primary-500" />
              <h3 className="font-medium text-xl">{benefit.title}</h3>
            </div>
            <p className="text-neutral-500 text-sm">{benefit.description}</p>
          </div>
          <div className="p-3 grid sm:grid-cols-2 gap-2">
            <div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Crypto</span>
              </div>
              <div>
                <p className="text-sm pt-1 font-normal text-green-600">
                  {benefit.cryptoAdvantage}
                </p>
              </div>
            </div>
            <div>
              <div>
                <div className="flex items-center gap-1">
                  <X className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Fiat</span>
                </div>
                <div>
                  <p className="text-sm pt-1 font-normal text-red-600">
                    {benefit.fiatDisadvantage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
