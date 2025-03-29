import { getSession } from "@/lib/data";
import { instrumentSerif } from "@/lib/fonts";
import { Button } from "../ui/button";
import SignOut from "./buttons/signOut";
import Link from "next/link";
import HamburgerMenu from "./hamburgerMenu";

export default async function Navbar() {
  const session = await getSession();
  return (
    <nav className="flex flex-col fixed inset-x-0 top-0 bg-white/10 backdrop-blur-xs border  border-border/40 z-30">
      <div className="flex justify-between px-5 py-3">
        <Link href="/" className={`${instrumentSerif.className} text-xl`}>
          Onboard
        </Link>
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="flex gap-3 items-center">
              <div className="text-sm">
                <SignOut />
              </div>
              <Link href="/recipients" className="text-sm text-neutral-700">
                Recipients
              </Link>
              <div>
                <Button className="h-7 text-xs shadow-none" variant="outline">
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
        <div className="md:hidden flex items-center">
          <HamburgerMenu />
        </div>
      </div>
    </nav>
  );
}
