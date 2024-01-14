"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Icons } from "./icons";

const LoginButton = () => {
  return (
    <Button
      type="button"
      onClick={() => signIn("google")}
      variant={"outline"}
      className="w-full py-6 text-base"
    >
      <Icons.google className="mr-2 h-6 w-6" />
      Sign in with Google
    </Button>
  );
};

export default LoginButton;
