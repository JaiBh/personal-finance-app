"use client";

import NoResults from "../transactionsPage/NoResults";
import LargeBillsList from "./LargeBillsList";
import MobileBillsList from "./MobileBillsList";
import { useEffect, useState } from "react";
import { Bill, TransactionUser } from "@/generated/prisma";
import { useBillsFiltersAtom } from "@/features/bills/store/useBillsFiltersAtom";
import getBills from "@/actions/getBills";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import LoadingSpinner from "../LoadingSpinner";

function BillsList() {
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState<
    (Bill & { transactionUser: TransactionUser })[]
  >([]);
  const { filters } = useBillsFiltersAtom();
  const { searchTerm, sortBy } = filters;

  const fetchBills = async ({
    bills,
  }: {
    bills: (Bill & { transactionUser: TransactionUser })[];
  }) => {
    try {
      setLoading(true);
      const previousBills = bills;
      const billsResp = await getBills({
        searchTerm: searchTerm.length ? searchTerm : undefined,
        sortBy,
      });
      setBills([...previousBills, ...billsResp]);
    } catch (err: any) {
      console.log("Error fetching bills", err);
      toast.error("Something went wrong...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBills([]);
    fetchBills({ bills: [] });
  }, [filters]);

  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
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

function LoadingSkeleton() {
  const times = 10;
  return (
    <>
      {Array(times)
        .fill(null)
        .map((_, index) => {
          return <Skeleton key={index} className="h-12"></Skeleton>;
        })}
    </>
  );
}
