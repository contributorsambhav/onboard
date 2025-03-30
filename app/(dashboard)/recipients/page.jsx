import Navbar from "@/components/app/navbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { columns } from "@/components/app/table/columns";
import DataTable from "@/components/app/table/dataTable";
import { instrumentSerif } from "@/lib/fonts";
import { Users } from "lucide-react";
import TransactionCard from "@/components/app/transactionCard";
import AddRecipientDialog from "@/components/app/recipients/addRecipientDialog";
import { getSession } from "@/lib/data";
import AddMockDataButton from "@/components/app/buttons/addMockDataButton";
import RecipientsSummary from "@/components/app/recipients/recipientsSummary";
import RecentTransactions from "@/components/app/recipients/transactions";
import PayRecipientsDialog from "@/components/app/recipients/payRecipientsDialog";

export default async function RecipientsPage() {
  const user = await getSession();
  const userId = user?.id;
  const resData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipients?userId=${userId}`,
  );
  const data = await resData.json();
  const recipients = data.data;
  return (
    <div className="pb-16">
      <header>
        <Navbar />
      </header>
      <section className="pt-20 px-5">
        <div className="flex items-center gap-3 justify-between">
          <p className="text-2xl font-bold">Recipients</p>
          <AddRecipientDialog />
        </div>
      </section>
      <section className="px-5 mt-5 grid lg:grid-cols-5 gap-4">
        <div className="w-full lg:col-span-3">
          {recipients?.length > 0 ? (
            <Tabs defaultValue="all" className="w-full flex">
              <TabsList className="grid grid-cols-3 w-full max-w-md text-xs">
                <TabsTrigger value="all">All Recipients</TabsTrigger>
                <TabsTrigger value="usdc">USDC</TabsTrigger>
                <TabsTrigger value="traditional">Traditional</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <DataTable columns={columns} data={recipients} />
              </TabsContent>
              <TabsContent value="usdc">
                <DataTable
                  columns={columns}
                  data={recipients?.filter(
                    (data) =>
                      data.paymentMethod.toUpperCase() == "USDC" ||
                      data.paymentMethod.toUpperCase() == "USDT",
                  )}
                  isCrypto={true}
                />
              </TabsContent>
              <TabsContent value="traditional">
                <DataTable
                  columns={columns}
                  data={recipients?.filter(
                    (data) =>
                      data.paymentMethod.toUpperCase() != "USDT" &&
                      data.paymentMethod.toUpperCase() !== "USDC",
                  )}
                  isCrypto={true}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <Tabs defaultValue="add" className={"w-full flex"}>
              <TabsList className="w-full max-w-md text-xs">
                <TabsTrigger value="add">Add Recipients</TabsTrigger>
              </TabsList>
              <TabsContent
                value="add"
                className="w-full h-48 rounded-md bg-neutral-100 flex justify-center items-center"
              >
                <AddMockDataButton userId={userId} />
              </TabsContent>
            </Tabs>
          )}
        </div>
        <div className="w-full lg:col-span-2 flex-col flex gap-4">
          <RecipientsSummary recipients={recipients} />
          <PayRecipientsDialog />
          <RecentTransactions />
        </div>
      </section>
    </div>
  );
}
