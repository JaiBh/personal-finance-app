"use client";

import NoResults from "./NoResults";
import LargeTransactionsList from "./LargeTransactionsList";
import MobileTransactionsList from "./MobileTransactionsList";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Transaction, TransactionUser } from "@/generated/prisma";
import getTransactions from "@/actions/getTransactions";
import { toast } from "sonner";
import { useTransactionsFiltersAtom } from "@/features/transactions/store/useTransactionsFiltersAtom";
import { Skeleton } from "../ui/skeleton";

function TransactionsList() {
  const [transactions, setTransactions] = useState<
    (Transaction & { transactionUser: TransactionUser })[]
  >([]);
  const [nextCursor, setNextCursor] = useState<undefined | string>(undefined);
  const [loading, setLoading] = useState(true);
  const { filters } = useTransactionsFiltersAtom();
  const {
    category,
    searchTerm,
    senderOrRecipient,
    sortBy,
    interval,
    recurring,
  } = filters;
  const fetchTransactions = async ({
    transactions,
    nextCursor,
  }: {
    transactions: (Transaction & { transactionUser: TransactionUser })[];
    nextCursor: string | undefined;
  }) => {
    try {
      setLoading(true);
      const previousTransactions = transactions;
      const transactionsResp = await getTransactions({
        paginate: true,
        take: 5,
        cursor: nextCursor,
        senderOrRecipient,
        recurring:
          recurring === "recurring"
            ? true
            : recurring === "non-recurring"
            ? false
            : undefined,
        category: category
          ? category === "all"
            ? undefined
            : category
          : undefined,
        searchTerm: searchTerm.length ? searchTerm : undefined,
        sortBy,
        startDate: interval.startDate,
        endDate: interval.endDate,
      });
      setTransactions([
        ...previousTransactions,
        ...transactionsResp.transactions,
      ]);
      setNextCursor(transactionsResp.nextCursor);
    } catch (err: any) {
      console.log("Error fetching products", err);
      toast.error("Something went wrong...");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    fetchTransactions({ transactions, nextCursor });
  };

  useEffect(() => {
    setTransactions([]), setNextCursor(undefined);
    fetchTransactions({ transactions: [], nextCursor: undefined });
  }, [filters]);

  if (loading) {
    return <LoadingSkeleton></LoadingSkeleton>;
  }

  if (transactions.length < 1) {
    return <NoResults info="transactions"></NoResults>;
  }

  return (
    <>
      <LargeTransactionsList
        transactions={transactions}
      ></LargeTransactionsList>
      <MobileTransactionsList
        transactions={transactions}
      ></MobileTransactionsList>
      <div className="flex justify-center">
        <Button
          disabled={loading}
          onClick={handleLoadMore}
          className={cn(!nextCursor && "hidden")}
        >
          {loading ? "Loading..." : "Load More"}
        </Button>
      </div>
    </>
  );
}
export default TransactionsList;

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
