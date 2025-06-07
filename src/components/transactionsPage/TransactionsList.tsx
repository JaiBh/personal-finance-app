"use client";

import { useSearchParams } from "next/navigation";
import { Category, SortBy, Transaction } from "../../../utils/types";
import NoResults from "./NoResults";
import LargeTransactionsList from "./LargeTransactionsList";
import MobileTransactionsList from "./MobileTransactionsList";
import Spinner from "../Spinner";
import { useGetFilteredTransactions } from "@/features/transactions/api/useGetFilteredTransactions";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../LoadingSpinner";
import FullScreenLoading from "../FullScreenLoading";

function isCategory(value: string): value is Category {
  return [
    "bills",
    "general",
    "shopping",
    "lifestyle",
    "education",
    "personal-care",
    "transportation",
    "dining-out",
    "groceries",
    "entertainment",
  ].includes(value);
}

function isSortBy(value: string): value is SortBy {
  return ["latest", "oldest", "a-z", "z-a", "highest", "lowest"].includes(
    value
  );
}
function TransactionsList() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "latest";
  const [resetting, setResetting] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasMore, setHasMore] = useState(true);

  if ((!isCategory(category) && category !== "all") || !isSortBy(sortBy)) {
    return <NoResults info="transactions"></NoResults>;
  }

  const { data, isLoading } = useGetFilteredTransactions(
    category,
    search,
    sortBy,
    5,
    resetting ? undefined : cursor
  );

  useEffect(() => {
    if (!data || isLoading) return;
    if (resetting) {
      setTransactions(data.page);
      setCursor(undefined);
    } else if (cursor) {
      if (!transactions.includes(data.page[0])) {
        setTransactions((prev) => [...prev, ...data.page]);
      }
    } else {
      setTransactions(data.page);
    }
    setHasMore(!data.isDone);
    setResetting(false);
  }, [data]);

  useEffect(() => {
    setResetting(true);
  }, [category, search, sortBy]);

  const handleLoadMore = () => {
    if (data?.continueCursor && hasMore && !isLoading) {
      setCursor(data.continueCursor);
    }
  };

  if (isLoading) {
    return <FullScreenLoading></FullScreenLoading>;
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
          disabled={isLoading}
          onClick={handleLoadMore}
          className={cn(!hasMore && "hidden")}
        >
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      </div>
    </>
  );
}
export default TransactionsList;
