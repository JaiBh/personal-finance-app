"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

function RedirectAuth() {
  const router = useRouter();
  useEffect(() => {
    router.push("/signIn");
  }, []);
  return null;
}
export default RedirectAuth;
