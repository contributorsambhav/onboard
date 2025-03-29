"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroNavigate() {
  return (
    <Link
      href="#fee-calculator"
      className="flex items-center"
      onClick={(e) => {
        e.preventDefault();
        document.querySelector("#fee-calculator").scrollIntoView({
          behavior: "smooth",
        });
      }}
    >
      <Button
        variant="outline"
        className="border-blue-200 bg-white/70 cursor-pointer backdrop-blur-sm text-blue-800 hover:bg-blue-50 px-6 py-2.5 rounded-lg transition-all duration-300 shadow-sm font-medium"
      >
        <svg
          className="w-4 h-4 mr-2 inline"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Calculate Savings
      </Button>
    </Link>
  );
}
