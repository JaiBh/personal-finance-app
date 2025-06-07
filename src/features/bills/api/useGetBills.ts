import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetBills = () => {
  const data = useQuery(api.bills.get);
  const isLoading = data === undefined;
  return { data, isLoading };
};
