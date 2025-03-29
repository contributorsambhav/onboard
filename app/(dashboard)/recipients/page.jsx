import Navbar from "@/components/app/navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Plus } from "lucide-react";
import { columns } from "@/components/app/table/columns";
import DataTable from "@/components/app/table/dataTable";
import { instrumentSerif } from "@/lib/fonts";
import { Users } from "lucide-react";
import TransactionCard from "@/components/app/transactionCard";

export default function RecipientsPage() {
  const tableData = [
    {
      name: "John Doe",
      country: "USA",
      paymentMethod: "USDC",
      lastPayment: "2025-03-20",
      actions: "Edit",
    },
    {
      name: "Jane Smith",
      country: "Canada",
      paymentMethod: "PayPal",
      lastPayment: "2025-03-25",
      actions: "View",
    },
    {
      name: "Carlos Ruiz",
      country: "Mexico",
      paymentMethod: "Bank Transfer",
      lastPayment: "2025-03-15",
      actions: "Delete",
    },
    {
      name: "Aisha Khan",
      country: "India",
      paymentMethod: "USDT",
      lastPayment: "2025-03-10",
      actions: "Edit",
    },
    {
      name: "Liam Brown",
      country: "UK",
      paymentMethod: "Debit Card",
      lastPayment: "2025-03-18",
      actions: "View",
    },
  ];
  return (
    <div className="pb-16">
      <header>
        <Navbar />
      </header>
      <section className="pt-20 px-5">
        <div className="flex items-center gap-3 justify-between">
          <p className="text-2xl font-bold">Recipients</p>
          <Button className="h-8 text-xs flex items-center" variant="outline">
            <Plus className="h-4 w-4" />
            <div>Add Recipient</div>
          </Button>
        </div>
      </section>
      <section className="px-5 mt-5 grid lg:grid-cols-5 gap-4">
        <div className="w-full lg:col-span-3 ">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid max-w-md grid-cols-3 text-xs">
              <TabsTrigger value="all">All Recipients</TabsTrigger>
              <TabsTrigger value="usdc">USDC</TabsTrigger>
              <TabsTrigger value="traditional">Traditional</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <DataTable columns={columns} data={tableData} />
            </TabsContent>
            <TabsContent value="usdc">
              <DataTable
                columns={columns}
                data={tableData.filter((data) => data.paymentMethod == "USDC")}
                isCrypto={true}
              />
            </TabsContent>
            <TabsContent value="traditional">
              <DataTable
                columns={columns}
                data={tableData.filter(
                  (data) =>
                    data.paymentMethod != "USDT" &&
                    data.paymentMethod !== "USDC",
                )}
                isCrypto={true}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full lg:col-span-2 flex-col flex gap-4">
          <div className="lg:col-span-2 border-2 border-neutral-200/50 bg-neutral-100/50 rounded-md h-fit">
            <h3
              className={`${instrumentSerif.className} bg-white rounded-t-md text-3xl font-bold px-5 py-3`}
            >
              Recent Summary
            </h3>
            <div className="px-3 py-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center rounded-full bg-neutral-100">
                  <Users className="h-4 text-neutral-700" />
                </div>
                <div className="text-xl flex items-center">
                  <p>{tableData.length}</p>
                </div>
                <p>Recipients</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <p>USDC Recipients</p>
                </div>
                <p className="font-medium">
                  {
                    tableData.filter((data) => data.paymentMethod == "USDC")
                      .length
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
                    tableData.filter((data) => data.paymentMethod !== "USDC")
                      .length
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
