"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center bg-gray-100 dark:bg-neutral-900 shadow-sm p-3 border-b border-neutral-200 dark:border-neutral-700">
      <Link href="/dashboard" className="flex flex-row items-center">
        <Image
          src="/logo.jpg"
          alt="logo"
          width={64}
          height={29}
          className="rounded-md"
        />

        <h2 className="font-bold text-xl hidden lg:inline-block ml-2 text-black dark:text-white">
          TokenMaker
        </h2>
      </Link>
      <div className="flex items-center space-x-4">
        <ConnectButton />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Header;
