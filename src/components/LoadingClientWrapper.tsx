"use client";

import { useLoadingAtom } from "@/features/global/store/useLoadingAtom";
import FullScreenLoading from "./FullScreenLoading";
import RouteLoadingReset from "./RouteLoadingReset";

function LoadingClientWrapper({ children }: { children: React.ReactNode }) {
  const [{ isLoading }] = useLoadingAtom();

  return (
    <>
      {children}
      {isLoading && <FullScreenLoading></FullScreenLoading>}
      <RouteLoadingReset></RouteLoadingReset>
    </>
  );
}
export default LoadingClientWrapper;
