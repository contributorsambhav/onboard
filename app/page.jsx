import Comparison from "@/components/app/comparison";
import FeeEstimator from "@/components/app/feeEstimator";
import PaymentDashboard from "@/components/app/paymentDashboard";
import HeroLanding from "@/components/app/heroLanding";
import CryptoTransaction from "@/components/app/cryptoTransaction";
import Navbar from "@/components/app/navbar";

export default function Home() {
  return (
    <div className="pb-10">
      <header>
        <Navbar />
      </header>
      <HeroLanding />
      <section className="px-5">
        <Comparison />
      </section>
      <CryptoTransaction />
      <section className="px-5" id="fee-calculator">
        <FeeEstimator />
      </section>
      {/* <section className="px-5 mt-5">
        <PaymentDashboard />
      </section> */}
      {/* <CombinedDashboard /> */}
    </div>
  );
}
