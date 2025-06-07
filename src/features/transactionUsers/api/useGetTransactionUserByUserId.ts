import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetTransactionUserByUserId = () => {
  const data = useQuery(api.transactionUsers.getByUserId);
  const isLoading = data === undefined;
  return { data, isLoading };
};
