import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetBudgets = () => {
  const data = useQuery(api.budgets.get);
  const isLoading = data === undefined;
  return { data, isLoading };
};
