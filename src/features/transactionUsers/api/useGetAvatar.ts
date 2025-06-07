import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useGetAvatarById = (id: Id<"_storage"> | null) => {
  // Call useQuery conditionally based on the 'id'
  const data = useQuery(api.avatars.getById, { storageId: id });
  const isLoading = data === undefined;
  return { data, isLoading };
};
