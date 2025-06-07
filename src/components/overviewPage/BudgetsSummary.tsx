"use client";

import RouteLink from "../RouteLink";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import BudgetsChart from "./BudgetsChart";
import BudgetsInfo from "./BudgetsInfo";
import { useGetBudgets } from "@/features/budgets/api/useGetBudgets";

function BudgetsSummary() {
  const { data: budgets, isLoading } = useGetBudgets();

  if (isLoading) {
    return (
      <div className="2xl:h-full">
        <Spinner></Spinner>
      </div>
    );
  }

  if (!budgets || !budgets.length) {
    return (
      <div className="p-4 text-center space-y-4 2xl:flex 2xl:flex-col 2xl:items-center 2xl:h-full 2xl:justify-center">
        <h3 className="text-present-3">
          You have no budgets set up to this account...
        </h3>
        <Button asChild>
          <RouteLink href="/budgets">Create First Budget</RouteLink>
        </Button>
      </div>
    );
  }
  const topBudgets = budgets
    .sort((a, b) => b.maxSpend - a.maxSpend)
    .slice(0, 4);

  return (
    <div className="grid gap-y-4 md:grid-cols-[1fr,_auto] md:max-lg:py-6 2xl:justify-between">
      <BudgetsChart></BudgetsChart>
      <BudgetsInfo topBudgets={topBudgets}></BudgetsInfo>
    </div>
  );
}
export default BudgetsSummary;
