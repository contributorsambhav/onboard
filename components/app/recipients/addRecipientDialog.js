"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Plus } from "lucide-react";
import { instrumentSerif } from "@/lib/fonts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useSession } from "@/lib/authClient";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddRecipientDialog() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const labelClasses = "text-xs text-neutral-700";
  const inputClasses =
    "shadow-none bg-neutral-50/30 border bg-neutral-100 border-neutral-200/70 focus-visible:ring-0";
  const selectItemClasses = "cursor-pointer";
  const { data: session } = useSession();
  const user = session?.user;

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      const dataObj = {
        ...data,
        userId: user?.id,
      };
      // console.log(dataObj);
      const res = await fetch("/api/recipients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });
      if (res.ok) {
        toast.success("Recipient added successfully");
      } else {
        toast.error(error.message || "Failed to add recipient");
      }
      e.target.reset();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to add recipient");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div
            className="h-8 text-xs flex items-center border gap-1 rounded-md px-3"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            <div>Add Recipient</div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className={`${instrumentSerif.className} text-2xl`}>
            Add Recipient
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div className="grid gap-2 grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs text-neutral-700">
                    Recipient Name
                  </Label>
                  <Input
                    name="name"
                    required
                    placeholder="Enter recipient name"
                    className={inputClasses}
                  />
                </div>
                <div className="space-y-1">
                  <Label className={labelClasses}>Payment Method</Label>
                  <Select name="paymentMethod" required>
                    <SelectTrigger className={`${inputClasses} w-full`}>
                      <SelectValue placeholder="Select Payment Method" />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-neutral-50">
                      <SelectItem value="usdc" className={selectItemClasses}>
                        USDC
                      </SelectItem>
                      <SelectItem value="usdt" className={selectItemClasses}>
                        USDT
                      </SelectItem>
                      <SelectItem value="bank" className={selectItemClasses}>
                        Bank Wire Transfer
                      </SelectItem>
                      <SelectItem value="paypal" className={selectItemClasses}>
                        PayPal
                      </SelectItem>
                      <SelectItem value="stripe" className={selectItemClasses}>
                        Stripe
                      </SelectItem>
                      <SelectItem value="wise" className={selectItemClasses}>
                        Wise
                      </SelectItem>
                      <SelectItem
                        value="payoneer"
                        className={selectItemClasses}
                      >
                        Payoneer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2 grid-cols-2">
                <div className="space-y-1">
                  <Label className={labelClasses}>Select Country</Label>
                  <Select name="country" required>
                    <SelectTrigger className={`${inputClasses} w-full`}>
                      <SelectValue placeholder="Select Recipient Country" />
                    </SelectTrigger>
                    <SelectContent className="w-full bg-neutral-50">
                      <SelectItem value="India" className={selectItemClasses}>
                        India
                      </SelectItem>
                      <SelectItem value="USA" className={selectItemClasses}>
                        USA
                      </SelectItem>
                      <SelectItem value="Canada" className={selectItemClasses}>
                        Canada
                      </SelectItem>
                      <SelectItem value="UK" className={selectItemClasses}>
                        UK
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-neutral-700">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-neutral-700">Set Amount</Label>
                <Input
                  name="amount"
                  type="number"
                  min="1"
                  placeholder="Enter Amount"
                  className={inputClasses}
                  required
                />
              </div>
            </div>
            <DialogFooter className="grid grid-cols-2 gap-2 mt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r border-t-2 hover:border-t-2 border-neutral-500 font-normal from-neutral-600 to-neutral-600 hover:opacity-95 duration-200 ease-out transition-all"
              >
                {isLoading ? (
                  <Loader className="animate-spin h-4 w-4" />
                ) : (
                  "Add Recipient"
                )}
              </Button>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-neutral-100/50 border-neutral-200/70 text-neutral-700 hover:bg-neutral-200/80"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
