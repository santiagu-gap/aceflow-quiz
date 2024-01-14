"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      variant={"outline"}
      className="w-full py-6 text-base"
    >
      <LogOut className="mr-2 h-6 w-6" />
      Sign Out
    </Button>
  );
};

export default LogoutButton;
