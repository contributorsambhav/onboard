import { instrumentSerif } from "@/lib/fonts";
import TransactionCard from "../transactionCard";

export default function RecentTransactions() {
  return (
    <div className="lg:col-span-2 border-2 border-neutral-200/50 bg-neutral-100/50 rounded-md h-fit">
      <h3
        className={`${instrumentSerif.className} bg-white rounded-t-md text-3xl font-bold px-5 py-3`}
      >
        Recent Transactions
      </h3>
      <div className="px-1 py-4 flex flex-col gap-3">
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </div>
    </div>
  );
}
