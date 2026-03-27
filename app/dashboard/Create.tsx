"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CreateTokenFormSchema, getWords } from "@/constants";
import CustomTokenInput from "@/components/customTokenInput";
import { TailSpin } from "react-loader-spinner";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { getSigner } from "../../constants/Signer";
import {
  BurnableTokenABI,
  MintableTokenABI,
  PausableTokenABI,
  CappedTokenABI,
  TimeLockTokenABI,
  mintableTokenBytecode,
  burnableTokenByteCode,
  pausableTokenByteCode,
  cappedTokenByteCode,
  timeLockTokenByteCode,
} from "@/constants/AllTokensABI";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleX } from "lucide-react";
interface CreateProps {
  type: string;
}

type TokenData = {
  name: string;
  symbol: string;
  supply: string;
  contractAddress: string;
};

const Create: React.FC<CreateProps> = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const [fetchedSigner, setFetchedSigner] = useState<ethers.Signer | null>(
    null
  );
  const [token, setToken] = useState<TokenData | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [errorInTokenCreation, seterrorInTokenCreation] = useState("");

  const { address } = useAccount();

  const formSchema = CreateTokenFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      mintAmount: undefined,
      capAmount: undefined,
    },
  });

  const fetchContract = async () => {
    const signer = await getSigner();

    setFetchedSigner(signer);

    if (!signer) {
      return null;
    }

    let factory;

    switch (type) {
      case "mintable":
        factory = new ethers.ContractFactory(
          MintableTokenABI,
          mintableTokenBytecode,
          signer
        );
        break;

      case "burnable":
        factory = new ethers.ContractFactory(
          BurnableTokenABI,
          burnableTokenByteCode,
          signer
        );
        break;

      case "pausable":
        factory = new ethers.ContractFactory(
          PausableTokenABI,
          pausableTokenByteCode,
          signer
        );
        break;

      case "capped":
        factory = new ethers.ContractFactory(
          CappedTokenABI,
          cappedTokenByteCode,
          signer
        );
        break;

      case "timeLock":
        factory = new ethers.ContractFactory(
          TimeLockTokenABI,
          timeLockTokenByteCode,
          signer
        );
        break;
      default:
        throw new Error("Unsupported token type");
    }

    return factory;
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const contract: any = await fetchContract();

      let deployContract;

      if (type === "capped" || type === "timeLock") {
        let dataCapAmount: any = ethers.parseUnits(
          data.capAmount as string,
          18
        );

        deployContract = await contract.deploy(
          data.name,
          data.symbol,
          dataCapAmount
        );
      } else {
        deployContract = await contract.deploy(data.name, data.symbol);
      }

      const mintTx = await deployContract.mint(
        address,
        ethers.parseUnits(data.mintAmount, 18),
        { gasLimit: 300000 }
      );

      await mintTx.wait();

      setToken({
        name: data.name,
        symbol: data.symbol,
        supply: data.mintAmount,
        contractAddress: deployContract.target,
      });

      setShowAnimation(true);
    } catch (error) {
      seterrorInTokenCreation(
        "Token Creation Failed; Please Try Again Later! or Get in Touch With Our Staff."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-start space-y-4 sm:space-y-8">
      {errorInTokenCreation && (
        <p className="text-red-500 m-4 text-center">
          <CircleX className="inline mr-2" /> {errorInTokenCreation}
        </p>
      )}

      <div className="flex justify-center h-auto w-full">
        <TypewriterEffectSmooth words={getWords(type)} />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-neutral-800 p-6 sm:p-8 rounded-lg shadow-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <CustomTokenInput
              control={form.control}
              name="name"
              label="Token Name"
              placeholder="DOGE COIN"
            />

            <CustomTokenInput
              control={form.control}
              name="symbol"
              label="Token Symbol"
              placeholder="DOG"
            />

            <CustomTokenInput
              control={form.control}
              name="mintAmount"
              label="Token Supply"
              placeholder="100000000"
            />

            {(type === "capped" || type === "timeLock") && (
              <CustomTokenInput
                control={form.control}
                name="capAmount"
                label="Max Token Supply"
                placeholder="10000000000"
              />
            )}

            <div className="flex flex-col space-y-4 mt-4">
              <Button
                disabled={loading}
                variant="default"
                type="submit"
                className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
              >
                {loading ? (
                  <TailSpin color="#FFF" height={24} width={24} />
                ) : (
                  "Create"
                )}
              </Button>
              <Link
                href={"./interact"}
                className="bg-blue-500 dark:bg-blue-600 py-2 px-4 rounded text-white text-center w-full hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300"
              >
                Interact with Token
              </Link>
            </div>
            <p className="mt-4 text-red-500 text-xs sm:text-sm text-center">
              ** Remember to save Token Address somewhere after creation
            </p>
          </form>
        </Form>
      </div>

      <Dialog open={showAnimation} onOpenChange={setShowAnimation}>
        <DialogTrigger asChild>
          <Button className="hidden">Trigger</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            <div className="text-green-50 flex flex-col items-center">
              Token Minted Successfully!
            </div>
          </DialogTitle>
          <DialogDescription>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center space-y-4 mt-4 text-lg"
            >
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Name: {token?.name}
              </motion.h1>
              <motion.h1
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Symbol: {token?.symbol}
              </motion.h1>
              <motion.h1
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                Supply: {token?.supply}
              </motion.h1>
              <motion.h1
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                Contract Address: {token?.contractAddress}
              </motion.h1>
            </motion.div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Create;
