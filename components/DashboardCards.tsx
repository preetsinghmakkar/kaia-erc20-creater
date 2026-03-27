"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./hooks/use-outside-click";
import Link from "next/link";

export function DashboardCards() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white dark:bg-neutral-800 rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-gray-100 dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <Link
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                    href={active.ctaLink}
                  >
                    {active.ctaText}
                  </Link>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-300 [mask:linear-gradient(to_bottom,white,white,transparent)] dark:[mask:linear-gradient(to_bottom,black,black,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col justify-between items-center bg-white dark:bg-neutral-800/60 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex flex-col gap-4 items-center text-center">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-24 md:w-24 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 mt-4 text-sm rounded-full font-bold bg-gray-100 dark:bg-neutral-700 dark:hover:bg-green-500 dark:text-neutral-200 hover:bg-green-500 hover:text-white text-black"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    title: "Mintable Token",
    description: "Allows new tokens to be minted by authorized users.",
    src: "/dashboardCards/mint.jpg",
    ctaText: "Create",
    ctaLink: "/dashboard/mintableToken/",
    content: () => {
      return (
        <p>
          The Mintable Token allows the owner or authorized users to mint new
          tokens, providing flexibility for expanding the token supply as
          needed. This feature is ideal for projects requiring dynamic token
          distribution. Utilize this token to efficiently manage token issuance
          with secure authorization controls.
        </p>
      );
    },
  },
  {
    title: "Burnable Token",
    description: "Allows tokens to be burned, reducing the total supply.",
    src: "/dashboardCards/burnable.png",
    ctaText: "Create",
    ctaLink: "/dashboard/burnableToken/",
    content: () => {
      return (
        <p>
          The Burnable Token enables the owner or authorized users to burn
          tokens, permanently removing them from circulation. This functionality
          is useful for managing the total token supply and increasing the value
          of remaining tokens. Employ this token to ensure a controlled and
          deflationary token economy.
        </p>
      );
    },
  },
  {
    title: "Pausable Token",
    description: "Allows token transfers to be paused during emergencies.",
    src: "/dashboardCards/pausable.png",
    ctaText: "Create",
    ctaLink: "/dashboard/pausableToken",
    content: () => {
      return (
        <p>
          The Pausable Token provides the capability to pause all token
          transfers in case of emergencies or critical updates. This feature
          enhances security by preventing unauthorized transactions during
          vulnerable periods. Integrate this token to maintain control and
          stability in your token ecosystem.
        </p>
      );
    },
  },
  {
    description: "Capped Token",
    title: "Capped Token",
    src: "/dashboardCards/capped.jpeg",
    ctaText: "Create",
    ctaLink: "/dashboard/cappedToken",
    content: () => {
      return (
        <p>
          A Capped Token ensures a maximum supply that cannot be exceeded,
          providing a controlled and predictable token economy. This token type
          is ideal for projects that need a fixed supply to maintain scarcity
          and value. The CappedToken smart contract utilizes OpenZeppelin
          libraries to implement standard functionalities, including minting and
          burning by authorized users, while enforcing the cap limit.
        </p>
      );
    },
  },
  {
    description: "TimeLock Token",
    title: "TimeLock Token",
    src: "/dashboardCards/timeLock.png",
    ctaText: "Create",
    ctaLink: "/dashboard/timeLockToken",
    content: () => {
      return (
        <p>
          A TimeLock Token allows you to lock a specific amount of tokens until
          a predetermined time, ensuring that the tokens cannot be transferred
          or used until they are released. This feature is particularly useful
          for vesting schedules, delayed payments, or securing funds until
          certain conditions are met. The TimeLockToken contract integrates
          OpenZeppelin TokenTimelock to provide secure and reliable time-locked
          token functionality.
        </p>
      );
    },
  },
];
