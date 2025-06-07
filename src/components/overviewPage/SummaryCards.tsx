"use client";

import { useGetTransactionsByMonthYear } from "@/features/transactions/api/useGetTransactionsByMonthYear";
import SummaryCard from "./SummaryCard";
import { useGetUserInfo } from "@/features/userInfo/api/useGetUserInfo";

function SummaryCards() {
  const { data: transactions, isLoading } = useGetTransactionsByMonthYear();
  const { data: userInfo, isLoading: userInfoIsLoading } = useGetUserInfo();

  const income =
    transactions
      ?.filter((transaction) => transaction.senderOrRecipient === "recipient")
      .reduce((acc, curr) => acc + curr.amount, 0) || 0;

  const expenses =
    transactions
      ?.filter((transaction) => transaction.senderOrRecipient === "sender")
      .reduce((acc, curr) => acc + curr.amount, 0) || 0;
  return (
    <section className="section-center">
      <ul className="grid gap-3 md:grid-cols-3 md:gap-6">
        <SummaryCard
          text="Current Balance"
          amount={userInfo?.balance || 0 / 100}
          active
          isLoading={userInfoIsLoading}
        ></SummaryCard>
        <SummaryCard
          text="Income"
          amount={income}
          isLoading={isLoading}
        ></SummaryCard>
        <SummaryCard
          text="Expenses"
          amount={expenses}
          isLoading={isLoading}
        ></SummaryCard>
      </ul>
    </section>
  );
}
export default SummaryCards;
