import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Category, SortBy, Transaction } from "../../../../utils/types";
import { useGetTransactions } from "./useGetTransactions";

export const useGetFilteredTransactions = (
  category: Category | "all",
  search?: string,
  sortBy: SortBy = "latest",
  limit = 10,
  cursor?: string | undefined
) => {
  const args =
    category === "all" ? { limit, cursor } : { category, limit, cursor };
  let data = useQuery(
    category === "all" ? api.transactions.get : api.transactions.getByCategory,
    args
  );

  // if (search) {
  //   data = data?.filter((transaction) =>
  //     transaction.name.toLowerCase().includes(search.toLowerCase())
  //   );
  // }
  // if (sortBy === "latest") {
  //   data = data?.sort((a, b) => b._creationTime - a._creationTime);
  // }
  // if (sortBy === "oldest") {
  //   data = data?.sort((a, b) => a._creationTime - b._creationTime);
  // }
  // if (sortBy === "a-z") {
  //   data = data?.sort((a, b) => a.name.localeCompare(b.name));
  // }
  // if (sortBy === "z-a") {
  //   data = data?.sort((a, b) => b.name.localeCompare(a.name));
  // }
  // if (sortBy === "highest") {
  //   data = data?.sort((a, b) => b.amount - a.amount);
  // }
  // if (sortBy === "lowest") {
  //   data = data?.sort((a, b) => a.amount - b.amount);
  // }

  const isLoading = data === undefined;
  return { data, isLoading };
};
