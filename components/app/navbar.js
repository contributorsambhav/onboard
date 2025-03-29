import { getSession } from "@/lib/data";
import { instrumentSerif } from "@/lib/fonts";
import { Button } from "../ui/button";
import SignOut from "./buttons/signOut";
import Link from "next/link";

export default async function Navbar() {
  const session = await getSession();
  return (
    <nav className="flex flex-col fixed inset-x-0 top-0 bg-white/10 backdrop-blur-xs border  border-border/40 z-30">
      <div className="flex justify-between px-5 py-2">
        <div className={`${instrumentSerif.className} text-xl`}>Onboard</div>
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="flex gap-3 items-center">
              <div className="text-sm text-neutral-500">
                <SignOut />
              </div>
              <div>
                <Button className="h-7 text-xs" variant="outline">
                  Connect Wallet
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center text-sm">
              <Link href="/sign-in">Sign In</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
