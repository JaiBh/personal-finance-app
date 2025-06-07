"use client";

import { useLoadingAtom } from "@/features/global/store/useLoadingAtom";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function RouteLoadingReset() {
  const [_, setLoadingAtom] = useLoadingAtom();
  const pathname = usePathname();

  useEffect(() => {
    setLoadingAtom({ isLoading: false });
  }, [pathname]);
  return null;
}
export default RouteLoadingReset;
