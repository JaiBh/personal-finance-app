"use client";

import { useSearchParams } from "next/navigation";
import { SortBy } from "../../../utils/types";
import NoResults from "../transactionsPage/NoResults";
import Spinner from "../Spinner";
import { useGetFilteredBills } from "@/features/bills/api/useGetFilteredBills";
import LargeBillsList from "./LargeBillsList";
import MobileBillsList from "./MobileBillsList";

function isSortBy(value: string): value is SortBy {
  return ["latest", "oldest", "a-z", "z-a", "highest", "lowest"].includes(
    value
  );
}

function BillsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "oldest";

  if (!isSortBy(sortBy)) {
    return <NoResults info="bills"></NoResults>;
  }

  const { data, isLoading } = useGetFilteredBills(search, sortBy);

  const bills = data || [];

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (bills.length < 1) {
    return <NoResults info="bills"></NoResults>;
  }

  return (
    <>
      <LargeBillsList bills={bills}></LargeBillsList>
      <MobileBillsList bills={bills}></MobileBillsList>
    </>
  );
}
export default BillsList;
