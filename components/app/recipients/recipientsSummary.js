import { Plus, Users } from "lucide-react";
import { instrumentSerif } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import PayRecipientsDialog from "./payRecipientsDialog";

export default function RecipientsSummary({ recipients }) {
  return (
    <div className="lg:col-span-2 border-2 border-neutral-200/50 bg-neutral-100/50 rounded-md h-fit">
      <h3
        className={`${instrumentSerif.className} bg-white rounded-t-md text-3xl font-bold px-5 py-3`}
      >
        Recipients Summary
      </h3>
      {recipients.length > 0 ? (
        <div className="px-3 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center rounded-full bg-neutral-100">
              <Users className="h-4 text-neutral-700" />
            </div>
            <div className="text-xl flex items-center">
              <p>{recipients?.length}</p>
            </div>
            <p>Recipients</p>
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
        </div>
      ) : (
        <div className="h-32 bg-neutral-100 flex justify-center items-center">
          No Summary
        </div>
      )}
    </div>
  );
}
