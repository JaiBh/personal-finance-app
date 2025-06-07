"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";

export function SignOutButton() {
  const router = useRouter();

  const { signOut } = useAuthActions();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/auth");
  };
  return <Button onClick={handleSignOut}>Sign Out</Button>;
}
