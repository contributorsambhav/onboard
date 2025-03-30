"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { instrumentSerif } from "@/lib/fonts";
import { CreditCard, ChartScatter, Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PayRecipientsDialog({ recipients, userId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentState, setPaymentState] = useState("");
  const router = useRouter();

  const handleAnaylzeClick = async () => {
    try {
      setIsLoading(true);
      setPaymentState("Sending Recipients data to AI agent...");
      const res = await fetch(
        "https://hiraya-ai-backend.chauhananiket2004.workers.dev/api/v1/anaylze-query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipients: recipients,
          }),
        },
      );
      const data = await res.json();
      // console.log(data);
      const { success, successfulPayments, pendingPayments } = data;
      if (success) {
        setPaymentState(
          "AI agent has successfully anaylzed the recipients, Adding transactions to the database...",
        );
        const res = await fetch("/api/recipients/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            transactions: successfulPayments,
          }),
        });
        // console.log(successfulPayments);
        // console.log(pendingPayments);
        if (res.ok) {
          setPaymentState(
            "Transactions have been successfully added to the database.",
          );
          router.refresh();
        }
      } else {
        setPaymentState("AI agent failed to anayze the recipients");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };
  return (
    <div>
      <Dialog>
        <div className="w-full flex justify-end">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-fit text-white hover:text-white bg-gradient-to-r border-t-2 border-b-0 hover:border-t-2 border-neutral-500 font-normal from-neutral-600 to-neutral-600 hover:opacity-95 duration-200 ease-out transition-all"
            >
              <CreditCard className="h-5" />
              Pay Recipients
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className={`${instrumentSerif.className} text-3xl`}>
              Pay Recipients
            </DialogTitle>
            <DialogDescription>
              Our AI will analyze your recipients and recommend the most
              cost-effective payment method for each one.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleAnaylzeClick}
            disabled={isLoading}
            className="text-white hover:text-white bg-gradient-to-r border-t-2 border-b-0 hover:border-t-2 border-neutral-500 font-normal from-neutral-600 to-neutral-600 hover:opacity-95 duration-200 ease-out transition-all"
          >
            {isLoading ? (
              <span>
                <Loader className="animate-spin h-4 w-4 mr-2" />
              </span>
            ) : (
              <span className="flex items-center">
                <ChartScatter className="h-4 mr-1" />
                Analyze with Hiraya
              </span>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
