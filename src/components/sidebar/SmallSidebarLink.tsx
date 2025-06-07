"use client";

import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import RouteLink from "../RouteLink";

interface LinkProps {
  pageName: string;
  href: string;
  Icon: IconType;
}

function SmallSidebarLink(props: LinkProps) {
  const pathname = usePathname();
  const { pageName, Icon, href } = props;
  const active = pathname === href;
  return (
    <li
      className={`rounded-t-lg w-[68px] md:w-[104px] ${active ? "bg-white border-b-4 border-secondary-green" : "text-grey-300 hover:text-white transition-all"}`}
    >
      <RouteLink href={href} className="flex flex-col gap-1 items-center py-3">
        <Icon className={`w-6 h-6 ${active && "text-secondary-green"}`}></Icon>
        <span
          className={`max-md:hidden text-present-5-bold ${active && "text-foreground"}`}
        >
          {pageName}
        </span>
      </RouteLink>
    </li>
  );
}
export default SmallSidebarLink;
