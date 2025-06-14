"use client";

import Image from "next/image";
import logo from "@/assets/logoLarge.svg";
import { Button } from "../ui/button";
import { useGlobalContext } from "../../../context";
import LargeSidebarLink from "./LargeSidebarLink";
import { IoMdHome } from "react-icons/io";
import { LuArrowDownUp } from "react-icons/lu";
import { FaChartPie, FaReceipt, FaArrowLeft } from "react-icons/fa";
import { MdSavings } from "react-icons/md";
import UserAvatar from "../UserAvatar";

function OpenSidebar() {
  const { setSidebarExpanded } = useGlobalContext();
  return (
    <div className="h-full flex flex-col">
      <div className="px-8 py-10">
        <Image
          src={logo}
          alt={"logo"}
          priority
          className="object-cover mx-auto"
        ></Image>
      </div>
      <div className="flex flex-col justify-between h-full">
        <ul className="grid gap-1 pr-6">
          <div className="mx-auto pb-4">
            <UserAvatar></UserAvatar>
          </div>
          <LargeSidebarLink
            Icon={IoMdHome}
            pageName={"Overview"}
            href={"/"}
          ></LargeSidebarLink>
          <LargeSidebarLink
            Icon={LuArrowDownUp}
            pageName={"Transactions"}
            href={"/transactions"}
          ></LargeSidebarLink>
          <LargeSidebarLink
            Icon={FaChartPie}
            pageName={"Budgets"}
            href={"/budgets"}
          ></LargeSidebarLink>
          <LargeSidebarLink
            Icon={MdSavings}
            pageName={"Pots"}
            href={"/pots"}
          ></LargeSidebarLink>
          <LargeSidebarLink
            Icon={FaReceipt}
            pageName={"Recurring bills"}
            href={"/bills"}
          ></LargeSidebarLink>
        </ul>
        <Button
          className="mb-[4.625rem] gap-5 text-grey-300 hover:text-grey-100 pl-8 justify-start"
          onClick={() => setSidebarExpanded(false)}
        >
          <FaArrowLeft className="!h-5 !w-5"></FaArrowLeft>
          <span className="text-present-3">Minimize Menu</span>
        </Button>
      </div>
    </div>
  );
}
export default OpenSidebar;
