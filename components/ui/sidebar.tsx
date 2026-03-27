"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useUser } from "@clerk/nextjs";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  // Make sure we aren't triggering accidental re-renders or conflicting hover states
  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open } = useSidebar();

  return (
    <>
      <motion.div
        className={cn(
          "h-auto px-4 py-4 hidden lg:flex lg:flex-col bg-gray-100 dark:bg-neutral-800 w-[300px] flex-shrink-0 border-r border-neutral-200 dark:border-neutral-700",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  const { user } = useUser();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row lg:hidden items-center justify-between bg-gray-100 shadow-sm dark:bg-neutral-800 w-full"
        )}
        {...props}
      >
        <div className="flex flex-row w-full">
          <h1>
            {" "}
            Welcome! <span className="text-red-500"> {user?.firstName} </span>
          </h1>
        </div>

        <div className="flex justify-end z-20 w-fit">
          <button
            className="text-neutral-800 dark:text-neutral-200 cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            <IconMenu2 />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between overflow-y-auto",
                className
              )}
            >
              <button
                className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200 cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-700"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                }}
              >
                <IconX />
              </button>
              <div 
                className="mt-10 h-full w-full"
                onClick={(e) => {
                  // Only close if they click on the links, don't close on every single random touch.
                  if (e.target instanceof HTMLElement && e.target.closest('a')) {
                    setOpen(false);
                  }
                }}
              >
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: Partial<LinkProps>;
}) => {
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-4 px-3 bg-white dark:bg-neutral-800/80 rounded-lg shadow-sm hover:bg-slate-100 dark:hover:bg-neutral-800 transition duration-300",
        className
      )}
      {...(props as any)}
    >
      <div className="flex-shrink-0 flex items-center justify-center">
        {link.icon}
      </div>

      <motion.span
        className="text-neutral-700 dark:text-white text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 overflow-hidden"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
