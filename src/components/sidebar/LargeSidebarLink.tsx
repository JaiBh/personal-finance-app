"use client";

import { IconType } from "react-icons";
import { usePathname } from "next/navigation";
import RouteLink from "../RouteLink";

interface LinkProps {
  pageName: string;
  href: string;
  Icon: IconType;
}

function LargeSidebarLink(props: LinkProps) {
  const pathname = usePathname();
  const { pageName, Icon, href } = props;
  const active = pathname === href;
  return (
    <li
      className={`pl-8 w-[276px] py-4 transition-all rounded-r-xl ${active ? "bg-white border-l-4 border-secondary-green" : "text-grey-300 hover:text-white"}`}
    >
      <RouteLink href={href} className="flex items-center gap-4">
        <Icon className={`w-6 h-6 ${active && "text-secondary-green"}`}></Icon>
        <span className={`text-present-3 ${active && "text-foreground"}`}>
          {pageName}
        </span>
      </RouteLink>
    </li>
  );
}
export default LargeSidebarLink;
