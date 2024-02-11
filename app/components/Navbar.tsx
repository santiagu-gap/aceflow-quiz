"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { AvatarDropdown } from "@/components/avatar-dropdown";
import { getAuthSession } from "@/lib/auth";
import { Session } from "next-auth";
import Link from "next/link";
// import { getMembershipType } from '@/util/users';

const Navbar = ({ session }: { session: Session | null }) => {
  const router = useRouter();

  const [membershipType, setMembershipType] = useState("free");

  const handleBackClick = () => {
    // router.push('/');
    window.location.href = "/pro";
  };

  return (
    <div className="w-full">
      <nav className="flex items-center justify-between px-6 py-6">
        <Link href={"/"}>
          <div className="text-2xl font-bold md:text-4xl">
            Ace
            <span className="text-primary">flow</span>
          </div>
        </Link>

        <div className="absolute opacity-0 md:relative md:opacity-100 inline-flex gap-4">
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
            <Button onClick={handleBackClick} size={"sm"}>
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
