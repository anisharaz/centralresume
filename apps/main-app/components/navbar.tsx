import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LoginButton } from "./auth-buttons";
import Link from "next/link";
import Image from "next/image";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [blend, setBlend] = useState(true);

  useEffect(() => {
    if (window) {
      const handleScroll = () => {
        if (window.scrollY > 50) {
          setBlend(false);
        } else {
          setBlend(true);
        }
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  });

  return (
    <div className="fixed z-[9999] w-full flex justify-center items-center">
      <nav
        className={`m-1 p-2 w-full max-w-[1400px] flex items-center justify-start max-md:flex-col max-md:items-start max-md:gap-2 transition-all duration-300 ease-in-out  rounded-lg ${
          (!blend || (isOpen && blend)) &&
          "bg-[color-mix(in_oklab,_var(--input)_30%,_transparent)] backdrop-blur-2xl border"
        }`}
      >
        {/* Logo and Hamburger Menu */}
        <div className="flex justify-between w-fit max-md:w-full px-2 max-md:py-2">
          <div className="flex items-center gap-2 max-md:gap-4">
            <div className="relative w-10 h-10 max-md:w-12 max-md:h-12">
              <Image
                src={"https://static.centralresume.me/logo.svg"}
                fill
                alt="Logo"
              />
            </div>
            <div className="font-bold text-xl flex justify-center items-center">
              Central <span className="text-amber-300"> #Resume </span>
            </div>
          </div>
          <div className="hidden max-md:flex justify-center items-center">
            <button
              className="focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {!isOpen ? <Menu /> : <X />}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex items-center justify-between px-2 w-full  ${
            isOpen ? "flex-col" : "max-md:hidden"
          }`}
        >
          <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:w-full max-md:pb-4 max-md:items-stretch">
            {/*<div className="bg-pink-500">Home</div>
          <div>Features</div>*/}
          </div>
          <div className="flex items-center justify-between max-md:w-full max-md:items-start gap-4">
            <Link href={"#contact"}>
              <Button variant={"link"} className="text-white">
                Contact Us
              </Button>
            </Link>
            <LoginButton />
          </div>
        </div>
      </nav>
    </div>
  );
}
