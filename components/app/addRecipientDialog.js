import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";
import { instrumentSerif } from "@/lib/fonts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function AddRecipientDialog() {
  const labelClasses = "text-xs text-neutral-700";
  const inputClasses =
    "shadow-none bg-neutral-50/30 border bg-neutral-100 border-neutral-200/70 focus-visible:ring-0";
  const selectItemClasses = "cursor-pointer";
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div
            className="h-8 text-xs flex items-center border gap-1 rounded-md px-3"
            variant="outline"
            asChild
          >
            <Plus className="h-4 w-4" />
            <div>Add Recipient</div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className={`${instrumentSerif.className} text-2xl`}>
            Add Recipient
          </DialogTitle>
          <div className="space-y-2">
            <div className="grid gap-2 grid-cols-2">
              <div className="space-y-1">
                <Label className="text-xs text-neutral-700">
                  Recipient Name
                </Label>
                <Input
                  name="recipientName"
                  placeholder="Enter recipient name"
                  className={inputClasses}
                />
              </div>
              <div className="space-y-1">
                <Label className={labelClasses}>Payment Method</Label>
                <Select>
                  <SelectTrigger className={`${inputClasses} w-full`}>
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                  <SelectContent className="w-full bg-neutral-50">
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
                    <SelectItem value="payoneer" className={selectItemClasses}>
                      Payoneer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label className={labelClasses}>Select Country</Label>
              <Select>
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
              <Label className="text-xs text-neutral-700">Set Amount</Label>
              <Input
                name="amount"
                type="number"
                placeholder="Enter Amount"
                className={inputClasses}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r border-t-2 hover:border-t-2 border-neutral-500 font-normal from-neutral-600 to-neutral-600 hover:opacity-95 duration-200 ease-out transition-all"
            >
              Add Recipient
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
