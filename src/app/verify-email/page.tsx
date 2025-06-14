"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VerifyEmailPage = () => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard"); // or wherever you want
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid code");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-semibold">Verify your email</h1>
      <p className="text-sm text-muted-foreground">
        Enter the code sent to your email to finish signing up.
      </p>
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="123456"
        required
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button type="submit">Verify</Button>
    </form>
  );
};

export default VerifyEmailPage;
