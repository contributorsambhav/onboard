import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CircleCheck, CircleX } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Onboard",
  description: "Onboard is a platform for international transactions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <Toaster
          position="top-center"
          icons={{
            success: <CircleCheck className="w-4 h-4 text-green-500" />,
            error: <CircleX className="w-4 h-4 text-red-500" />,
          }}
        />
        {children}
      </body>
    </html>
  );
}
