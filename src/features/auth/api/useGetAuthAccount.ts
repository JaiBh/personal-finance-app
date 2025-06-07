import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetAuthAccount = () => {
  const data = useQuery(api.authAccounts.getByUserId);
  const isLoading = data === undefined;
  return { data: data, isLoading };
};
