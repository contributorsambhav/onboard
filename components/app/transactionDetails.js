import clsx from "clsx";
import { Info } from "lucide-react";

// TODO: use dynamic values here
export default function TransactionDetails({
  crypto,
  settlementTime,
  exchangeRate,
}) {
  return (
    <div
      className={clsx("p-4 border text-sm rounded-md flex gap-2 w-full", {
        "border-red-100 bg-red-50": !crypto,
        "border-blue-100 bg-blue-50": crypto,
      })}
    >
      <Info
        className={clsx({
          "text-red-500": !crypto,
          "text-blue-500": crypto,
        })}
      />
      <div className="space-y-2 w-full">
        <p
          className={clsx("", {
            "text-red-700": !crypto,
            "text-blue-700": crypto,
          })}
        >
          Transation Details
        </p>
        <div
          className={clsx({
            "text-red-700": !crypto,
            "text-blue-700": crypto,
          })}
        >
          <div className="flex justify-between gap-2 items-center w-full">
            <p>Transation Fee:</p>
            <p className={"font-semibold"}>$45.30 (4.53%)</p>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <p>Settlement Time</p>
            <p className="font-semibold">{settlementTime}</p>
          </div>
          <div className="flex justify-between gap-2 items-center">
            <p>Exchange Rate:</p>
            <p className="font-semibold">{exchangeRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
