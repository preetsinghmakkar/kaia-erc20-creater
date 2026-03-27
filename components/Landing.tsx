"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Linkedin } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconBrandGithub, IconX } from "@tabler/icons-react";
import Link from "next/link";

const Landing = () => {
  const router = useRouter();
  return (
    <>
      <section className="max-container padding-container flex flex-col gap-20 py-10 pb-0 md:gap-28 lg:py-20 xl:flex-row">
        <div className="relative flex flex-1 items-center">
          <div className="relative z-20 flex w-full h-64 sm:h-80 md:h-96 lg:h-full flex-col gap-8 rounded-3xl overflow-hidden">
            <Image
              src="/logo1.jpg"
              alt="Descriptive Alt Text"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
          </div>
        </div>

        <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
          <h1 className="bold-52">
            Create Your Own Custom ERC20 Tokens with Ease
          </h1>
          <p className="regular-16 mt-6 mb-6 text-gray-30 xl:max-w-[520px]">
            TokenMaker simplifies the process of creating and managing your own
            ERC20 tokens. No coding required.
          </p>
          <div className="flex flex-col w-full gap-6 sm:flex-row mt-6">
            <Button
              type="button"
              title="Get Started"
              variant="destructive"
              onClick={() => {
                router.push("/sign-in");
              }}
              className="rounded-full"
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>

      <section id="howItWorks" className="scroll-mt-24 flexCenter flex-col bg-white dark:bg-background py-20">
        <div className="max-container padding-container">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col justify-center items-center md:items-center lg:items-center">
              <p className="regular-16 text-gray-30 dark:text-gray-300 text-center lg:text-center">
                Watch this video to see how TokenMaker revolutionizes the
                process of creating custom ERC20 tokens. Learn how our platform
                allows you to effortlessly design, mint, and manage your tokens
                with intuitive features and robust security measures, ensuring a
                seamless and secure experience.
              </p>
            </div>
            <div
              className="relative"
              style={{
                paddingBottom: "56.25%",
                position: "relative",
                height: 0,
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/2VrVzpOl4xU"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section
        id="Contact"
  className="scroll-mt-24 flex flex-col items-center bg-gray-100 dark:bg-neutral-900 py-20"
      >
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-10 text-center dark:text-gray-100">
            About the Creator
          </h2>
          <div className="flex flex-col items-center gap-10 md:flex-row md:gap-20">
            <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl shadow-black/30">
              <Image
                src="/profile-pic.jpeg"
                alt="Preet Singh"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-gray-300 dark:border-white/10"
              />
            </div>
            <div className="flex flex-col items-center md:items-start">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Hello! I&apos;m Preet Singh, the creator of TokenMaker. With a
                passion for blockchain technology and decentralized
                applications, I am dedicated to simplifying the token creation
                process for everyone. My goal is to make blockchain accessible
                and user-friendly.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                I&apos;ve worked hard to ensure that TokenMaker offers an
                intuitive and secure experience for creating and managing ERC20
                tokens. Feel free to connect with me through the links below!
              </p>
              <div className="flex gap-4">
                <Link href={"https://github.com/preetsinghmakkar/TokenMaker"}>
                  <Button variant="secondary" className="gap-1">
                    <IconBrandGithub className="w-6 h-6" />
                    GitHub
                  </Button>
                </Link>
                <Link
                  href={"https://www.linkedin.com/in/preet-singh-a65967302/"}
                >
                  <Button variant="secondary" className="gap-1">
                    <Linkedin className="w-6 h-6" />
                    LinkedIn
                  </Button>
                </Link>
                <Link href="https://x.com/RaOne_0xDev">
                  <Button variant="secondary" className="gap-1">
                    <IconX className="w-6 h-6" />
                    Twitter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

  <section id="FAQs" className="scroll-mt-24 flexCenter flex-col bg-white dark:bg-black py-20">
        <div className="max-container padding-container">
          <h2 className="bold-40 mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="w-full max-w-4xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  What makes TokenMaker different from other token creation
                  platforms?
                </AccordionTrigger>
                <AccordionContent>
                  TokenMaker stands out by offering an intuitive interface for
                  creating customizable ERC20 tokens with features like
                  Mintable, Burnable, Paused, Capped, and TimeLock. Our platform
                  emphasizes ease of use and security, ensuring you can manage
                  your tokens efficiently without needing deep technical
                  knowledge.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I customize my token after creation?
                </AccordionTrigger>
                <AccordionContent>
                  Currently, TokenMaker allows for initial customization during
                  token creation, including setting features like Mintable and
                  Capped. For major changes, you may need to create a new token.
                  We are continually working on adding more flexible features
                  for post-creation adjustments.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How does TokenMaker ensure my tokens are secure?
                </AccordionTrigger>
                <AccordionContent>
                  TokenMaker uses robust security protocols and blockchain
                  technology to ensure the safety of your tokens. Our platform
                  follows best practices in smart contract development and
                  regularly audits its code to protect against vulnerabilities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  What are the costs associated with creating tokens on
                  TokenMaker?
                </AccordionTrigger>
                <AccordionContent>
                  Creating tokens on TokenMaker involves transaction fees on the
                  Ethereum network, such as gas fees. The platform itself does
                  not charge additional fees for token creation. We strive to
                  keep costs transparent and provide a cost-effective solution
                  for token management.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  How can I get support if I encounter issues?
                </AccordionTrigger>
                <AccordionContent>
                  If you encounter any issues or need assistance, you can reach
                  out to our support team via the contact form on our website or
                  directly through our social media channels. We are committed
                  to providing timely support and resolving any issues you may
                  face.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
