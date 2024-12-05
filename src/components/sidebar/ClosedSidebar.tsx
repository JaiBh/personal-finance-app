"use client";

import Image from "next/image";
import logo from "@/assets/logoSmall.svg";
import { Button } from "../ui/button";
import { useGlobalContext } from "../../../context";
import ClosedSidebarLink from "./ClosedSidebarLink";
import { IoMdHome } from "react-icons/io";
import { LuArrowDownUp } from "react-icons/lu";
import { FaChartPie, FaReceipt, FaArrowRight } from "react-icons/fa";
import { MdSavings } from "react-icons/md";

function ClosedSidebar() {
  const { setSidebarExpanded } = useGlobalContext();
  return (
    <div className="h-full flex flex-col">
      <div className="px-8 py-10">
        <Image
          src={logo}
          alt={"logo"}
          priority
          className="object-cover"
        ></Image>
      </div>
      <div className="flex flex-col justify-between h-full">
        <ul className="grid gap-1 pr-2">
          <ClosedSidebarLink Icon={IoMdHome} href={"/"}></ClosedSidebarLink>
          <ClosedSidebarLink
            Icon={LuArrowDownUp}
            href={"/transactions"}
          ></ClosedSidebarLink>
          <ClosedSidebarLink
            Icon={FaChartPie}
            href={"/budgets"}
          ></ClosedSidebarLink>
          <ClosedSidebarLink
            Icon={MdSavings}
            href={"/pots"}
          ></ClosedSidebarLink>
          <ClosedSidebarLink
            Icon={FaReceipt}
            href={"/bills"}
          ></ClosedSidebarLink>
        </ul>
        <Button
          className="mb-[4.625rem] text-grey-300 hover:text-grey-100 justify-center"
          variant={"tertiary"}
          onClick={() => setSidebarExpanded(true)}
        >
          <FaArrowRight className="!h-5 !w-5"></FaArrowRight>
        </Button>
      </div>
    </div>
  );
}
export default ClosedSidebar;
