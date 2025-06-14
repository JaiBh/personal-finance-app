"use client";

import { useLoadingAtom } from "@/features/global/store/useLoadingAtom";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

function RouteLink({
  href,
  children,
  className,
  onClick,
  onMouseOut,
  onMouseOver,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [_, setLoadingAtom] = useLoadingAtom();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== href) {
      setLoadingAtom({ isLoading: true });
      startTransition(() => {
        router.push(href);
      });
    }
    onClick?.();
  };
  return (
    <a
      onClick={handleClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      className={cn("cursor-pointer", className)}
    >
      {children}
    </a>
  );
}
export default RouteLink;
