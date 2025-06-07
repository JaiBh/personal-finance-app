import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { SortBy } from "../../../../utils/types";

export const useGetFilteredBills = (
  search?: string,
  sortBy: SortBy = "oldest"
) => {
  let data = useQuery(api.bills.get);

  if (search) {
    data = data?.filter((bill) =>
      bill.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (sortBy === "latest") {
    data = data?.sort(
      (a, b) => Number(b.billDayOfMonth) - Number(a.billDayOfMonth)
    );
  }
  if (sortBy === "oldest") {
    data = data?.sort(
      (a, b) => Number(a.billDayOfMonth) - Number(b.billDayOfMonth)
    );
  }
  if (sortBy === "a-z") {
    data = data?.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === "z-a") {
    data = data?.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (sortBy === "highest") {
    data = data?.sort((a, b) => b.amount - a.amount);
  }
  if (sortBy === "lowest") {
    data = data?.sort((a, b) => a.amount - b.amount);
  }

  const isLoading = data === undefined;
  return { data, isLoading };
};
