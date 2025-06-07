import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetTransactionUserById = (id: Id<"transactionUsers">) => {
  const data = useQuery(api.transactionUsers.getById, { transactionId: id });
  const isLoading = data === undefined;
  return { data, isLoading };
};
