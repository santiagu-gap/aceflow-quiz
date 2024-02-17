/* eslint-disable @next/next/no-async-client-component */
'use client';
import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import CoolBlur from "@/components/cool-blur";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import addEmailToPremium from "../util/updateNeon";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();  // get the client session

  return (
    <div>
      <Navbar fixed={true} />
      <CoolBlur />
      <div className="flex flex-col h-svh items-center justify-evenly px-6 pb-10 pt-20 pt-10 md:mx-32 md:pt-28">
        <div className="space-y-2 text-center">
          <div className="text-2xl font-bold md:text-4xl lg:text-6xl">
            <span>Ace Your Next Test With </span> <br />
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-violet-600 inline-block text-transparent bg-clip-text">
              Unlimited Practice{" "}
            </span>
            <span> Questions</span>
          </div>
        </div>

        <Image
          src={"/a+final.png"}
          height={100}
          width={100}
          alt=""
          className="h-36 w-40 md:h-56 md:w-60 xl:h-64 xl:w-72"
        />

        <div className="space-y-4 md:space-y-12 text-center flex flex-col">
          <div className="text-sm font-semibold md:text-xl lg:px-[20%]">
            Turn your study material into practice questions with our AI tool to
            ace your quizzes, tests, and exams.
          </div>

          <div className="flex flex-col items-center gap-4">
            <Link href={session?.user?.id !== null ? `/create` : `/login`}>
              <Button size={"lg"}>Start Learning</Button>
            </Link>

            <a href="https://www.termsfeed.com/live/9d023795-96b2-4140-ab8e-4d9b000fb4ef">
              Privacy policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
