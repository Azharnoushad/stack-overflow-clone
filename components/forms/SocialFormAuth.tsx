"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { ROUTES } from "@/constants/routes";

const SocialFormAuth = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3.5";

  const handleSignIn = async (provider: "github" | "google") => {
    console.log("dadasdasd");
    try {
      await signIn(provider, {
        redirect: true,
        callbackUrl: ROUTES.HOME,
      });
    } catch (error) {
      console.log(error);
      toast("Authentication Failed", {
        description: error instanceof Error ? error.message : "Somthing went wrong",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          width={20}
          height={20}
          alt="Github Logo"
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Login with Github</span>
      </Button>

      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image src="/icons/google.svg" width={20} height={20} alt="Google Logo" className="mr-2.5 object-contain" />
        <span>Login with Google</span>
      </Button>
    </div>
  );
};

export default SocialFormAuth;
