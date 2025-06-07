import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetBudget = (id: Id<"budgets">) => {
  const data = useQuery(api.budgets.getById, { budgetId: id });
  const isLoading = data === undefined;
  return { data, isLoading };
};
