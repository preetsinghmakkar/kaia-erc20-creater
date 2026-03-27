"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconCoins,
  IconCoin,
  IconCoinYen,
  IconCoinPound,
  IconCoinRupee,
  IconSwipeRight,
} from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { DashboardCards } from "@/components/DashboardCards";
import Header from "@/components/Header";
import WagmiProviderContext from "@/constants/walletProvider";

import "@rainbow-me/rainbowkit/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Interact with My Token",
      href: "/dashboard/interact",
      icon: (
        <IconSwipeRight
          stroke={2}
          className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
        />
      ),
    },
    {
      label: "Mintable Token",
      href: "/dashboard/mintableToken",
      icon: (
        <IconCoin
          stroke={2}
          className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
        />
      ),
    },
    {
      label: "Burnable Token",
      href: "/dashboard/burnableToken",
      icon: (
        <IconCoinYen
          stroke={2}
          className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
        />
      ),
    },
    {
      label: "Pausable Token",
      href: "/dashboard/pausableToken",
      icon: (
        <IconCoins
          stroke={2}
          className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
        />
      ),
    },
    {
      label: "Capped Token",
      href: "/dashboard/cappedToken",
      icon: (
        <IconCoinPound
          stroke={2}
          className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"
        />
      ),
    },
    {
      label: "Time Lock Token",
      href: "/dashboard/timeLockToken",
      icon: (
        <IconCoinRupee className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  return (
    <WagmiProviderContext>
      <Header />
      <div
        className={cn(
          "flex flex-col lg:flex-row bg-gray-100 dark:bg-neutral-900 w-full flex-1 min-h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 px-3 py-4">
                <IconBrandTabler className="w-8 h-8 text-neutral-700 dark:text-white" />
                <span className="text-neutral-700 dark:text-white font-semibold hidden lg:inline">TokenMaker</span>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 px-3 py-4 bg-white dark:bg-neutral-800/80 rounded-lg">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex flex-1 w-full flex-col min-h-screen overflow-y-auto bg-gray-100 dark:bg-neutral-900 pb-20">
          <div className="p-4 sm:p-6 lg:p-8 w-full flex-1">
            {children}
          </div>
        </div>
      </div>
    </WagmiProviderContext>
  );
}
