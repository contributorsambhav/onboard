import { CircleAlert, Users } from "lucide-react";
import { instrumentSerif } from "@/lib/fonts";

export default function RecipientsSummary({ recipients }) {
  // console.log(recipients);
  // paid recipients
  const paidRecipients = recipients.filter(
    (recipient) => recipient.status === "paid",
  );
  // unpaid recipients
  // const unpaidRecipients = recipients.filter((recipient) => recipient.status !== "paid");
  return (
    <div className="lg:col-span-2 border-2 border-neutral-200/50 bg-neutral-100/50 rounded-md h-fit">
      <h3
        className={`${instrumentSerif.className} bg-white rounded-t-md text-3xl font-bold px-5 py-3`}
      >
        Recipients Summary
      </h3>
      {recipients.length > 0 ? (
        <div className="px-3 py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center rounded-full bg-neutral-100">
                <Users className="h-4 text-neutral-700" />
              </div>
              <div className="text-xl flex items-center">
                <p>{recipients?.length}</p>
              </div>
              <p>Recipients</p>
            </div>
            {paidRecipients.length > 0 && (
              <div className="px-3 border border-green-200 text-green-700 rounded-full bg-green-200">
                {paidRecipients.length}
                <span className="ml-0.5">Paid</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <p>Crypto Recipients</p>
            </div>
            <p className="font-medium">
              {
                recipients?.filter(
                  (data) =>
                    data.paymentMethod.toUpperCase() == "USDC" ||
                    data.paymentMethod.toUpperCase() == "USDT",
                ).length
              }
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center rounded-full">
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
              <p>Traditional Recipients</p>
            </div>
            <p className="font-medium">
              {
                recipients?.filter(
                  (data) =>
                    data.paymentMethod.toUpperCase() !== "USDC" &&
                    data.paymentMethod.toUpperCase() !== "USDT",
                ).length
              }
            </p>
          </div>
          <div className="p-3 flex gap-2 border text-yellow-800 rounded-md text-xs md:text-sm border-yellow-300 bg-yellow-100">
            <CircleAlert className="w-7" />
            <p>
              Please note that right now we are only supporting USDC and USDT
              (crypto payment methods) as payment methods. Support for all other
              methods will be provided soon.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-32 bg-neutral-100 flex justify-center items-center">
          No Summary
        </div>
      )}
    </div>
  );
}
