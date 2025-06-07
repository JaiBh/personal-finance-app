import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Category } from "../../../../utils/types";

export const useGetTransactionsByCategoryMonthYear = (category: Category) => {
  // live application would have new Date()
  const yearMonth = "2024-08";

  const data = useQuery(api.transactions.getByCategoryMonthYear, {
    category,
    yearMonth,
  });
  const isLoading = data === undefined;
  return { data, isLoading };
};
