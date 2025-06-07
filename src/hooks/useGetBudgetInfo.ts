import { Transaction } from "../../utils/types";

export const useGetBudgetInfo = (
  maxSpend: number,
  transactions: Transaction[] | undefined
) => {
  const spent = transactions?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
  let free = maxSpend - spent;
  if (free < 0) {
    free = 0;
  }
  return { spent, free };
};
