import { Check } from "lucide-react";

export default function TransactionCard() {
  return (
    <div className="flex hover:bg-neutral-200/80 rounded-md py-1 cursor-pointer transtion-all duration-200 ease-out px-2 items-center justify-between gap-2">
      <div className="flex gap-2 items-center">
        {/* TODO: change the static colors to be dynamic according to status */}
        <div className="w-8 h-8 rounded-full bg-green-100 flex justify-center items-center">
          <Check className="h-4 text-green-500" />
        </div>
        <div>
          <p className="text-sm">Aniket Chauhan</p>
          <p className="text-xs text-neutral-600">Payment Sent</p>
        </div>
      </div>
      <div>
        <p className="font-medium text-sm">2500</p>
        <p className="text-neutral-600 text-xs">Today</p>
      </div>
    </div>
  );
}
