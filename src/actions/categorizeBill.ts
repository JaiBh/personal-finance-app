import { Bill } from "@/generated/prisma";
import { ClientBill } from "../../utils/types";

export const categorizeBill = (bill: ClientBill | Bill) => {
  const today = new Date();
  const upcomingDaysMs = 1000 * 60 * 60 * 24 * 5;
  if (Number(bill.billDayOfMonth) <= today.getDate()) {
    const nextMonthBillDate = new Date(
      `${today.getFullYear()}-${today.getMonth() + 2}-${bill.billDayOfMonth}`
    );
    const diffMs = nextMonthBillDate.getTime() - today.getTime();
    if (diffMs <= upcomingDaysMs) {
      return "due soon";
    }
    return "paid";
  } else if (
    new Date(
      `${today.getFullYear()}-${today.getMonth() + 1}-${bill.billDayOfMonth}`
    ).getTime() -
      today.getTime() <=
    upcomingDaysMs
  ) {
    return "due soon";
  } else {
    return "upcoming";
  }
};
