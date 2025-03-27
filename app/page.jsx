import Comparison from "@/components/app/comparison";
import FeeEstimator from "@/components/app/feeEstimator";
import PaymentDashboard from "@/components/app/paymentDashboard";
import HeroLanding from "@/components/app/heroLanding";
import CryptoTransaction from "@/components/app/cryptoTransaction";

export default function Home() {
  return (
    <div className="pb-10">
      <HeroLanding />
      <section className="px-5">
        <Comparison />
        {/* <div className="border flex md:items-center flex-col md:flex-row md:justify-between border-neutral-500 px-5 py-3 my-5 bg-neutral-100 rounded-md">
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
        </div> */}
      </section>
      <CryptoTransaction />
      <section className="px-5">
        <FeeEstimator />
      </section>
      <section className="px-5 mt-5">
        <PaymentDashboard />
      </section>
      {/* <CombinedDashboard /> */}
    </div>
  );
}
