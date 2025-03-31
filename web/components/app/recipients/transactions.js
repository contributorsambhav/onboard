import { instrumentSerif } from "@/lib/fonts";
import TransactionCard from "../transactionCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function RecentTransactions({ recentTransactions }) {
  return (
    <div className="lg:col-span-2 border-2 border-neutral-200/50 bg-neutral-100/50 rounded-md h-fit">
      <h3
        className={`${instrumentSerif.className} bg-white rounded-t-md text-3xl font-bold px-5 py-3`}
      >
        Recent Transactions
      </h3>
      {recentTransactions?.length > 0 ? (
        <ScrollArea className="px-2 h-56 w-full py-2 flex flex-col gap-2">
          {recentTransactions.map((transaction, index) => (
            <TransactionCard
              name={transaction?.recipientId?.name}
              amount={transaction?.amount}
              paymentMethod={transaction?.paymentMethod}
              status={transaction?.status}
              date={transaction?.createdAt}
              key={index}
            />
          ))}
        </ScrollArea>
      ) : (
        <div className="h-32 bg-neutral-100 flex justify-center items-center">
          No Transactions
        </div>
      )}
    </div>
  );
}
