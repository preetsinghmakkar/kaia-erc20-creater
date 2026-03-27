"use client";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  const router = useRouter();

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Only smooth-scroll for same-page anchor links
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      // External links and "/" are handled normally by <Link>
    },
    []
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 py-4 sm:px-6">
      <nav
        className="
          flex w-full max-w-[1440px] items-center justify-between
          rounded-2xl border border-black/5 dark:border-white/10
          bg-white/80 dark:bg-black/50 px-6 py-4 sm:px-10 sm:py-5
          shadow-lg shadow-black/5 dark:shadow-[0_10px_40px_rgba(0,0,0,0.55)]
          backdrop-blur-xl
          transition-all duration-300
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="TokenMaker logo"
            width={46}
            height={46}
            className="rounded-lg"
          />
          <span className="hidden text-2xl font-bold text-gray-900 dark:text-gray-100 sm:inline-block">
            TokenMaker
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="
                  flex items-center gap-2 rounded-lg px-4 py-2.5
                  text-base font-medium text-gray-700 dark:text-gray-300
                  transition-colors duration-200
                  hover:bg-white/40 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-gray-100
                "
              >
                {link.icons ? <link.icons size={18} /> : null}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button
            type="button"
            variant="destructive"
            size="lg"
            className="rounded-full px-7 text-base shadow-md shadow-red-500/20 transition-shadow hover:shadow-lg hover:shadow-red-500/30"
            onClick={() => router.push("/sign-in")}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile: brand name + theme toggle + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100 sm:hidden">
            TokenMaker
          </span>
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="rounded-lg hover:bg-white/40"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="
                border-r border-white/20 dark:border-neutral-800
                bg-white/80 dark:bg-black/95 backdrop-blur-2xl
                p-0
              "
            >
              <div className="flex h-full flex-col p-6">
                {/* Mobile Logo */}
                <div className="mb-8 flex items-center gap-3">
                  <Image
                    src="/logo.jpg"
                    alt="TokenMaker logo"
                    width={42}
                    height={42}
                    className="rounded-lg"
                  />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    TokenMaker
                  </h2>
                </div>

                {/* Mobile Nav Links */}
                <ul className="flex flex-1 flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <li key={link.key}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="
                          flex items-center gap-3 rounded-xl px-4 py-3
                          text-base font-medium text-gray-700 dark:text-gray-300
                          transition-colors duration-200
                          hover:bg-white/60 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-gray-100
                        "
                      >
                        {link.icons ? <link.icons size={20} /> : null}
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Mobile CTA */}
                <Button
                  type="button"
                  variant="destructive"
                  size="lg"
                  className="mt-4 w-full rounded-full shadow-md shadow-red-500/20"
                  onClick={() => router.push("/sign-in")}
                >
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
