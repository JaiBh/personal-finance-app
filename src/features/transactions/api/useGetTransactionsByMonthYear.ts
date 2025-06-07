import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
export const useGetTransactionsByMonthYear = () => {
  // live application would have new Date()
  const yearMonth = "2024-08";

  const data = useQuery(api.transactions.getByMonthYear, { yearMonth });
  const isLoading = data === undefined;
  return { data, isLoading };
};
