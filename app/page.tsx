'use client'
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


export default async function Home() {
  let session: Session | null = await getAuthSession();

  return (
    <div>
      <Navbar session={session} />
      <CoolBlur />
      <div className="grid h-fit items-center justify-center gap-8 px-6 pb-20 pt-10 md:mx-32 md:pt-28">
        <div className="space-y-2 text-center">
          <div className="mb-6 text-xl font-bold md:text-4xl lg:text-6xl">
            <span>Ace Your Next Test With </span> <br />
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-violet-600 inline-block text-transparent bg-clip-text">
              Unlimited Practice{" "}
            </span>
            <span> Questions</span>
          </div>
        </div>

        <div className="space-y-12 text-center flex flex-col">
          <div className="text-sm font-semibold md:text-xl lg:px-[20%]">
            Create infinite practice questions from your own study material to
            ace your quizzes, tests, and exams.
          </div>

          <Link href={session?.user?.id !== null ? `/create` : `/login`}>
            <Button size={"lg"}>Start Learning</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
