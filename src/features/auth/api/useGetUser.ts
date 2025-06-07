import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetUser = () => {
  const data = useQuery(api.users.get);
  const isLoading = data === undefined;
  return { data: data?.user, isLoading };
};
