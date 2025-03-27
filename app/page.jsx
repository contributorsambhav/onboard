import Comparison from "@/components/app/comparison";
import CombinedDashboard from "../components/app/gasfeesestimator";
import { Button } from "@/components/ui/button";
import FeeCalculator from "@/components/app/feeCalculator";
export default function Home() {
  return (
    <div>
      <section className="flex flex-col text-xl font-bold lg:text-3xl xl:text-4xl text-center h-44 md:h-56 lg:h-64 justify-center items-center">
        <h3>Why Choose Crypto for International Trades</h3>
        <p className="px-5 w-full max-w-lg text-sm md:text-base font-normal">
          Experience faster, cheaper, and more secure international transactions
          with cryptocurrency payments
        </p>
      </section>
      <section className="px-5">
        <Comparison />
        <div className="border flex md:items-center flex-col md:flex-row md:justify-between border-neutral-500 px-5 py-3 my-5 bg-neutral-100 rounded-md">
          <div>
            <h3 className="text-neutral-800 font-medium text-lg">
              Ready to experience the crypto advantage?
            </h3>
            <p className="text-neutral-600 text-sm">
              Try our fee calculator to see how much you could save today.
            </p>
          </div>
          <div>
            <Button className="bg-neutral-900 font-normal h-8 hover:bg-neutral-900 duration-200 opacity-90 transition-all ease-out cursor-pointer">
              Calculate Saving
            </Button>
          </div>
        </div>
      </section>
      <section className="px-5">
        <FeeCalculator />
      </section>
      <CombinedDashboard />
    </div>
  );
}
