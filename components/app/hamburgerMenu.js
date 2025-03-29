"use client";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function HamburgerMenu() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => setToggleMenu((prev) => !prev);
  return (
    <div>
      <div className="md:hidden flex justify-end">
            <Menu
              className="overflow-hidden block md:hidden cursor-pointer"
              onClick={handleToggleMenu}
            />
          </div>
      <div className="fixed top-[50px] left-0 px-5 mx-auto w-full h-auto md:hidden z-[100] ">
        {
          toggleMenu && (
            <div className="md:hidden block bg-white/10 back animate-menu-animation transform-gpu transition-transform duration-200ms ease-in-out">
              <div>
                Sign Out
              </div>
              <div>
              <div>
                Recipients
              </div>
                Connect Wallet
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}