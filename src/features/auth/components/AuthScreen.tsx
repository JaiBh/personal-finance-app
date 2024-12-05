"use client";

import { useState } from "react";
import { SignInFlow } from "../types";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-[90%] max-w-[35rem] md:h-auto">
        {state === "signIn" ? (
          <SignInCard setState={setState}></SignInCard>
        ) : (
          <SignUpCard setState={setState}></SignUpCard>
        )}
      </div>
    </div>
  );
};
