import { instrumentSerif } from "@/lib/fonts";
import { Button } from "../ui/button";
import Link from "next/link";
import HeroNavigate from "./buttons/hero-navigate";
export default function HeroLanding() {
  return (
    <section
      className={`relative flex font-extrabold flex-col text-xl lg:text-3xl xl:text-4xl text-center min-h-[60vh] lg:min-h-[70vh] justify-center items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50`}
    >
      <div
        className="absolute inset-0 particle-network"
        aria-hidden="true"
      ></div>
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient
              id="nodeGlow"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="flow-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          <path
            className="network-path"
            d="M10,30 Q30,60 50,30 T90,30"
            stroke="url(#flow-gradient)"
            strokeWidth="0.4"
            fill="none"
          />
          <path
            className="network-path-alt"
            d="M20,80 Q40,40 60,70 T95,50"
            stroke="url(#flow-gradient)"
            strokeWidth="0.4"
            fill="none"
          />
          <path
            className="network-path-fast"
            d="M5,50 Q25,20 55,50 T95,50"
            stroke="url(#flow-gradient)"
            strokeWidth="0.4"
            fill="none"
          />
          <circle
            className="network-node node-pulse-1"
            cx="20"
            cy="30"
            r="1.2"
            fill="#3b82f6"
          />
          <circle
            className="network-node node-pulse-2"
            cx="50"
            cy="30"
            r="1.4"
            fill="#3b82f6"
          />
          <circle
            className="network-node node-pulse-3"
            cx="80"
            cy="30"
            r="1"
            fill="#3b82f6"
          />
          <circle
            className="network-node node-pulse-1"
            cx="15"
            cy="50"
            r="1.1"
            fill="#3b82f6"
          />
          <circle
            className="network-node node-pulse-2"
            cx="45"
            cy="60"
            r="1.3"
            fill="#3b82f6"
          />
          <circle
            className="network-node node-pulse-3"
            cx="75"
            cy="70"
            r="1.2"
            fill="#3b82f6"
          />
          <circle
            className="network-node node-pulse-1"
            cx="25"
            cy="80"
            r="1.1"
            fill="#3b82f6"
          />
          <circle
            className="network-node node-pulse-2"
            cx="60"
            cy="70"
            r="1.2"
            fill="#3b82f6"
          />
          <circle
            className="network-node node-pulse-3"
            cx="85"
            cy="40"
            r="1.3"
            fill="#3b82f6"
          />
        </svg>
        <svg
          className="absolute w-10 h-10 text-blue-400/70 animate-float-slow top-1/4 left-1/5 drop-shadow-lg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
        </svg>

        <svg
          className="absolute w-14 h-14 text-emerald-400/70 animate-float-spin bottom-1/4 left-1/6 drop-shadow-lg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <path d="M12.31 11.14c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
        </svg>

        <svg
          className="absolute w-8 h-8 text-blue-400/70 animate-float-medium bottom-1/3 right-1/4 drop-shadow-lg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
        </svg>

        <svg
          className="absolute w-12 h-12 text-blue-400/70 animate-float-fast top-1/3 right-1/6 drop-shadow-lg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.06 11.57c.59-.69.94-1.59.94-2.57 0-1.86-1.27-3.43-3-3.87V3h-2v2h-2V3H9v2H6v2h2v10H6v2h3v2h2v-2h2v2h2v-2.13c1.73-.44 3-2.01 3-3.87 0-.98-.35-1.88-.94-2.57zM10 7h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4V7zm5 10h-5v-4h5c1.1 0 2 .9 2 2s-.9 2-2 2z" />
        </svg>
        <svg
          className="absolute w-9 h-9 text-amber-400/70 animate-float-medium top-2/5 left-2/3 drop-shadow-lg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.06 11.57c.59-.69.94-1.59.94-2.57 0-1.86-1.27-3.43-3-3.87V3h-2v2h-2V3H9v2H6v2h2v10H6v2h3v2h2v-2h2v2h2v-2.13c1.73-.44 3-2.01 3-3.87 0-.98-.35-1.88-.94-2.57zM10 7h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4V7zm5 10h-5v-4h5c1.1 0 2 .9 2 2s-.9 2-2 2z" />
        </svg>
        <svg
          className="absolute w-11 h-11 text-indigo-400/70 animate-float-slow top-3/5 left-1/3 drop-shadow-lg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 1.75L5.75 12.25L12 16L18.25 12.25L12 1.75ZM12 22.25L5.75 13L12 16.75L18.25 13L12 22.25Z" />
        </svg>
      </div>
      <div className="flex flex-col z-10 px-4 md:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <div className="px-3 w-fit font-sans font-normal text-xs inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm shadow-sm border border-blue-100/50 rounded-full py-1.5 mb-5">
            <div className="w-2 h-2 rounded-full bg-neutral-500 animate-pulse"></div>
            <span className="font-medium text-neutral-800">Onboard</span> -{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-neutral-500">
              Powered by PaymanAI
            </span>
          </div>
        </div>
        <h1
          className={`${instrumentSerif.className} mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 via-neutral-800 to-emerald-700 relative inline-block`}
        >
          Why Choose Crypto for International Trades
          <div className="absolute -bottom-2 left-0 right-0 mx-auto w-24 h-1 bg-gradient-to-r from-neutral-500 to-emerald-500 rounded-full"></div>
        </h1>
        <p className="text-base md:text-lg font-normal text-neutral-700 mb-10 max-w-xl mx-auto">
          Experience <span className="font-semibold text-blue-700">faster</span>
          , <span className="font-semibold text-emerald-700">cheaper</span>, and{" "}
          <span className="font-semibold text-indigo-700">more secure</span>{" "}
          international transactions with cryptocurrency payments
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <Link href="/recipients" className="flex items-center">
            <Button className="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300 border border-blue-700/20 font-medium">
              Recipients
            </Button>
          </Link>
          <HeroNavigate />
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-neutral-600">
          <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-blue-50">
            <svg
              className="w-4 h-4 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-medium">Encryption</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-blue-50">
            <svg
              className="w-4 h-4 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-medium">Lower Fees</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-blue-50">
            <svg
              className="w-4 h-4 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-medium">24/7 Settlements</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-auto"
        >
          <path
            d="M0 120L48 105C96 90 192 60 288 55C384 50 480 70 576 75C672 80 768 70 864 65C960 60 1056 60 1152 65C1248 70 1344 80 1392 85L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V120Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}
