"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { AvatarDropdown } from "@/components/avatar-dropdown";
import Link from "next/link";
import { useSession } from "next-auth/react";
// import { getMembershipType } from '@/util/users';

const Navbar = ({fixed, bg }: { fixed?: boolean, bg?: boolean }) => {
  const { data: session } = useSession();  // get the client session
  const router = useRouter();

  const [membershipType, setMembershipType] = useState("free");

  return (
    <div className={`${fixed ? 'fixed':""} ${bg ? 'dark:bg-background/90 bg-background/95':""} w-full `}>
      <nav className="flex items-center justify-between md:px-6 py-6">
        <Link href={"/"}>
          <div className="text-2xl opacity-0 md:opacity-100 font-bold md:text-4xl">
            Ace
            <span className="text-primary">flow</span>
          </div>
        </Link>

        <div className="absolute flex justify-around w-full inline-flex md:w-auto md:gap-4 md:relative md:flex-none md:justify-normal ">
          {membershipType === "pro" ? (
            <Button
              onClick={() => {
                router.push(`/create`);
              }}
              variant={"outline"}
              size={"sm"}
            >
              Imagine ✨
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push(`/pro`);
              }}
              size={"sm"}
            >
              Try Aceflow Pro+
            </Button>
          )}
          <AvatarDropdown session={session} />
        </div>

      </nav>
    </div>
  );
};

export default Navbar;