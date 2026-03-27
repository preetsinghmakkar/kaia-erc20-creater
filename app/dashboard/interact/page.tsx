"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  BurnableTokenABI,
  MintableTokenABI,
  PausableTokenABI,
  CappedTokenABI,
  TimeLockTokenABI,
} from "@/constants/AllTokensABI";
import { InteractFormSchema } from "@/constants";
import { getSigner } from "@/constants/Signer";
import { Oval } from "react-loader-spinner";
import TransferToken from "../transferToken/TransferToken";
import { CircleX } from "lucide-react";

const InteractPage = () => {
  interface fetchContractType {
    type: string;
    tokenAddress: string;
  }

  interface tokenDetailsTypes {
    tokenName: string;
    tokenSymbol: string;
    tokenSupply: string;
  }

  interface DataInput {
    address: string;
    tokenType: string;
  }

  const [tokenDetails, setTokenDetails] = useState<tokenDetailsTypes | null>(
    null
  );
  const [showAnimation, setShowAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DataInput>({ address: "", tokenType: "" });

  const [transferOn, setTransferOn] = useState(false);

  const [ErrorInInteraction, setErrorInInteraction] = useState("");

  const formSchema = InteractFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      tokenType: "",
    },
  });

  const fetchContract = async ({ type, tokenAddress }: fetchContractType) => {
    const signer = await getSigner();

    if (!signer) {
      return null;
    }

    let factory;

    switch (type) {
      case "mintable":
        factory = new ethers.Contract(tokenAddress, MintableTokenABI, signer);
        break;

      case "burnable":
        factory = new ethers.Contract(tokenAddress, BurnableTokenABI, signer);
        break;

      case "pausable":
        factory = new ethers.Contract(tokenAddress, PausableTokenABI, signer);
        break;

      case "capped":
        factory = new ethers.Contract(tokenAddress, CappedTokenABI, signer);
        break;

      case "timeLock":
        factory = new ethers.Contract(tokenAddress, TimeLockTokenABI, signer);
        break;
      default:
        throw new Error("Unsupported token type");
    }

    return factory;
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      setData({ address: data.address, tokenType: data.tokenType });
      const contract = await fetchContract({
        type: data.tokenType,
        tokenAddress: data.address,
      });

      const tokenName = await (contract as any).name();
      const tokenSymbol = await (contract as any).symbol();
      const fetchedTotalSupply = await (contract as any).totalSupply();
      const tokenSupply = ethers.formatEther(fetchedTotalSupply);

      setTokenDetails({ tokenName, tokenSymbol, tokenSupply });
      setShowAnimation(true);
      setIsLoading(false);
    } catch (error) {
      setErrorInInteraction(
        "Unable to Find Your Token! For Help Get in Touch With Our Staff"
      );
    }
  };

  return (
    <>
      {transferOn ? (
        <TransferToken data={data} />
      ) : (
        <div className="w-full flex flex-col items-center justify-start space-y-4 sm:space-y-8">
          {ErrorInInteraction && (
            <p className="text-red-500 m-4 text-center">
              <CircleX className="inline mr-2" /> {ErrorInInteraction}
            </p>
          )}

          <Card className="w-full max-w-lg bg-white dark:bg-neutral-800 shadow-2xl rounded-lg">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-gray-900 dark:text-white">
                Fetch Token Details!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Enter Token Address
                  </label>
                  <Input
                    id="address"
                    {...form.register("address")}
                    placeholder="0x..."
                    className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="tokenType"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Select a Token Type
                  </label>
                  <select
                    id="tokenType"
                    {...form.register("tokenType")}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option disabled value="">
                      Select an option
                    </option>
                    <option value="mintable">Mintable</option>
                    <option value="burnable">Burnable</option>
                    <option value="pausable">Pausable</option>
                    <option value="capped">Capped</option>
                    <option value="timeLock">TimeLock</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Oval color="#FFFFFF" height={20} width={20} />
                  ) : (
                    "Fetch Token Details"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {tokenDetails && (
            <Dialog open={showAnimation} onOpenChange={setShowAnimation}>
              <DialogTrigger asChild>
                <Button className="hidden">Trigger</Button>
              </DialogTrigger>
              <DialogContent className="bg-white dark:bg-neutral-800">
                <DialogTitle className="text-gray-900 dark:text-white">
                  Token Details
                </DialogTitle>
                <DialogDescription>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center space-y-4 mt-4 text-lg text-gray-900 dark:text-white"
                  >
                    <motion.h1
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      Name: {tokenDetails.tokenName}
                    </motion.h1>
                    <motion.h1
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      Symbol: {tokenDetails.tokenSymbol}
                    </motion.h1>
                    <motion.h1
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      Total Supply: {tokenDetails.tokenSupply}
                    </motion.h1>
                    <Button
                      onClick={() => setTransferOn(true)}
                      className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Transfer Token
                    </Button>
                  </motion.div>
                  <span className="text-red-400 m-2 flex justify-center">
                    *Make sure you are the Owner for Transfer
                  </span>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </>
  );
};

export default InteractPage;
