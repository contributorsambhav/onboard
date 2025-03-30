import Navbar from "@/components/app/navbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { columns } from "@/components/app/table/columns";
import DataTable from "@/components/app/table/dataTable";
import { instrumentSerif } from "@/lib/fonts";
import { Users } from "lucide-react";
import TransactionCard from "@/components/app/transactionCard";
import AddRecipientDialog from "@/components/app/addRecipientDialog";
import { getSession } from "@/lib/data";
import AddMockDataButton from "@/components/app/buttons/addMockDataButton";

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
                    (data) => data.paymentMethod.toUpperCase() == "USDC",
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
          <div className="lg:col-span-2 border-2 border-neutral-200/50 bg-neutral-100/50 rounded-md h-fit">
            <h3
              className={`${instrumentSerif.className} bg-white rounded-t-md text-3xl font-bold px-5 py-3`}
            >
              Recipients Summary
            </h3>
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
          </div>
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
        </div>
      </section>
    </div>
  );
}
