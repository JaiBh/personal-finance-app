"use client";

import { IoMdHome } from "react-icons/io";
import { LuArrowDownUp } from "react-icons/lu";
import { FaChartPie, FaReceipt } from "react-icons/fa";
import { MdSavings } from "react-icons/md";
import SmallSidebarLink from "./SmallSidebarLink";
import UserAvatar from "../UserAvatar";

function SmallSidebar() {
  return (
    <nav className="bg-grey-900 rounded-t-lg pt-4 px-4">
      <ul className="flex justify-between max-w-[43rem] mt-0 mx-auto items-center">
        <SmallSidebarLink
          Icon={IoMdHome}
          pageName={"Overview"}
          href={"/"}
        ></SmallSidebarLink>
        <SmallSidebarLink
          Icon={LuArrowDownUp}
          pageName={"Transactions"}
          href={"/transactions"}
        ></SmallSidebarLink>
        <SmallSidebarLink
          Icon={FaChartPie}
          pageName={"Budgets"}
          href={"/budgets"}
        ></SmallSidebarLink>
        <SmallSidebarLink
          Icon={MdSavings}
          pageName={"Pots"}
          href={"/pots"}
        ></SmallSidebarLink>
        <SmallSidebarLink
          Icon={FaReceipt}
          pageName={"Recurring bills"}
          href={"/bills"}
        ></SmallSidebarLink>
        <UserAvatar></UserAvatar>
      </ul>
    </nav>
  );
}
export default SmallSidebar;
