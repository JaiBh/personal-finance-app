"use client";

import { useGetBills } from "@/features/bills/api/useGetBills";
import { FaReceipt } from "react-icons/fa";
import Spinner from "../Spinner";

function BillsSummary() {
  const { data: bills, isLoading } = useGetBills();
  const totalBills = bills?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  const today = new Date("2024-08-20").getDate();
  const paidBills =
    bills?.filter((bill) => {
      return Number(bill.billDayOfMonth) <= today;
    }) || [];

  const upcomingBills =
    bills?.filter((bill) => {
      return Number(bill.billDayOfMonth) > today;
    }) || [];

  const dueSoonBills =
    bills?.filter((bill) => {
      return (
        Number(bill.billDayOfMonth) > today &&
        Number(bill.billDayOfMonth) - today <= 5
      );
    }) || [];

  return (
    <div className="grid gap-4 md:max-2xl:grid-cols-2">
      <div className="bg-grey-900 rounded-xl px-5 py-6 flex items-center gap-5 text-white md:flex-col md:items-start md:gap-8 md:max-2xl:justify-between">
        <FaReceipt className="size-10"></FaReceipt>
        <div className="space-y-3">
          <h4 className="text-present-4">Total bills : {bills?.length || 0}</h4>

          <h1 className="text-present-1">${totalBills / 100}</h1>
        </div>
      </div>
      <div className="px-5 pt-6 pb-2 rounded-xl bg-card">
        <h3 className="text-present-3">Summary</h3>
        <ul className="flex flex-col gap-[1px] bg-grey-500/20">
          <li className="bg-card py-4 flex justify-between items-center">
            <p className="text-present-5">Paid Bills</p>
            <p className="text-present-5-bold">
              {paidBills.length || 0} ($
              {(paidBills.reduce((acc, curr) => acc + curr.amount, 0) || 0) /
                100}
              )
            </p>
          </li>
          <li className="bg-card py-4 flex justify-between items-center">
            <p className="text-present-5">Total Upcoming</p>
            <p className="text-present-5-bold">
              {upcomingBills.length || 0} ($
              {(upcomingBills.reduce((acc, curr) => acc + curr.amount, 0) ||
                0) / 100}
              )
            </p>
          </li>
          <li className="bg-card py-4 flex justify-between items-center text-secondary-red">
            <p className="text-present-5">Due Soon</p>
            <p className="text-present-5-bold">
              {dueSoonBills.length || 0} ($
              {(dueSoonBills.reduce((acc, curr) => acc + curr.amount, 0) || 0) /
                100}
              )
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default BillsSummary;
