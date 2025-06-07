import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetTransactionUsers = () => {
  const data = useQuery(api.transactionUsers.get);
  const isLoading = data === undefined;
  return { data, isLoading };
};
