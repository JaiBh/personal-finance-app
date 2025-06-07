import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetPots = () => {
  const data = useQuery(api.pots.get);
  const isLoading = data === undefined;
  return { data, isLoading };
};
