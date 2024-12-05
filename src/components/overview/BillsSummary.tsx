"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function BillsSummary() {
  const bills = useQuery(api.bills.get);
  if (!bills || !bills.length) {
    return (
      <div className="p-4 flex items-center justify-center">
        <h3 className="text-present-4">
          You have no recurring bills linked to this account...
        </h3>
      </div>
    );
  }
  const today = new Date("2034-08-20").getDate();
  const paidBills = bills?.filter((bill) => {
    return Number(bill.billDayOfMonth) <= today;
  });

  const upcomingBills = bills.filter((bill) => {
    return Number(bill.billDayOfMonth) > today;
  });
  const dueSoonBills = bills.filter((bill) => {
    return (
      Number(bill.billDayOfMonth) > today &&
      Number(bill.billDayOfMonth) - today <= 5
    );
  });
  return (
    <ul className="flex gap-2 flex-col">
      <li className="bg-background py-5 px-4 flex items-center justify-between border-l-[4px] border-secondary-green rounded-xl">
        <h4 className="text-present-4 capitalize text-grey-500">paid bills</h4>
        <h4 className="text-present-4-bold">
          $
          {(
            paidBills?.reduce((acc, curr) => acc + curr.amount, 0) / 100 || 0
          ).toFixed(2)}
        </h4>
      </li>
      <li className="bg-background py-5 px-4 flex items-center justify-between border-l-[4px] border-secondary-yellow rounded-xl">
        <h4 className="text-present-4 capitalize text-grey-500">
          total upcoming
        </h4>
        <h4 className="text-present-4-bold">
          $
          {(
            upcomingBills?.reduce((acc, curr) => acc + curr.amount, 0) / 100 ||
            0
          ).toFixed(2)}
        </h4>
      </li>
      <li className="bg-background py-5 px-4 flex items-center justify-between border-l-[4px] border-secondary-cyan rounded-xl">
        <h4 className="text-present-4 capitalize text-grey-500">due soon</h4>
        <h4 className="text-present-4-bold">
          $
          {(
            dueSoonBills?.reduce((acc, curr) => acc + curr.amount, 0) / 100 || 0
          ).toFixed(2)}
        </h4>
      </li>
    </ul>
  );
}
export default BillsSummary;
