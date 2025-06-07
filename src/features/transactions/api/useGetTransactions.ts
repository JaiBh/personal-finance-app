import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetTransactions = (limit = 10, cursor?: string | undefined) => {
  const data = useQuery(api.transactions.get, { limit, cursor });
  const isLoading = data === undefined;
  return { data, isLoading };
};
