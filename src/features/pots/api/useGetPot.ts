import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetPot = (id: Id<"pots">) => {
  const data = useQuery(api.pots.getById, { id });
  const isLoading = data === undefined;
  return { data, isLoading };
};
