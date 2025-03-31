import { Check } from "lucide-react";

export default function TransactionCard({
  name,
  amount,
  status,
  date,
  paymentMethod,
}) {
  // console.log(amount)
  return (
    <div className="flex hover:bg-neutral-200/80 rounded-md py-1 cursor-pointer transtion-all duration-200 ease-out px-2 items-center justify-between gap-2">
      <div className="flex gap-2 items-center">
        {/* TODO: change the static colors to be dynamic according to status */}
        <div className="w-8 h-8 rounded-full bg-green-100 flex justify-center items-center">
          <Check className="h-4 text-green-500" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm">{name}</p>
          <p className="text-xs text-green-600 ">{status}</p>
        </div>
      </div>
      <div>
        <p className="font-medium text-sm">${amount}</p>
        <p className="text-neutral-600 text-xs">
          {new Date(date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
