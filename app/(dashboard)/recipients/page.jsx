import Navbar from "@/components/app/navbar";
import { Button } from "@/components/ui/button";

export default async function RecipientsPage() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <section className="pt-20 px-5">
        <div className="flex items-center gap-3 justify-between">
          <p>
            Recipients
          </p>
          <Button className="h-8 text-xs" variant="outline">
            Add Recipient
          </Button>
        </div>
      </section>
    </div>
  )
}