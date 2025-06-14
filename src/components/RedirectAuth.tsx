"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

function RedirectAuth() {
  const router = useRouter();
  useEffect(() => {
    router.push("/auth");
  }, []);
  return null;
}
export default RedirectAuth;
