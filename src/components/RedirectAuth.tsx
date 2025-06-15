"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RedirectAuth() {
  const router = useRouter();
  useEffect(() => {
    router.push("/sign-in");
  }, []);
  return null;
}
export default RedirectAuth;
