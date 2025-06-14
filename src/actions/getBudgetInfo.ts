import { Transaction } from "@/generated/prisma";
import { ClientTransaction } from "../../utils/types";

export const getBudgetInfo = (
  maxSpend: number,
  transactions: Transaction[] | undefined | ClientTransaction[]
) => {
  const spent =
    transactions?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
  let free = maxSpend - spent;
  return { spent, free };
};
