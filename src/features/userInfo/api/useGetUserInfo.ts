import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useGetUserInfo = () => {
  const data = useQuery(api.userInfo.get);
  const isLoading = data === undefined;

  return { data, isLoading };
};
