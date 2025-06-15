"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  to?: string;
  delay?: number;
}

export default function ClientRedirect({ to = "/", delay = 0 }: Props) {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(to);
    }, delay);

    return () => clearTimeout(timeout);
  }, [to, delay, router]);

  return null;
}
