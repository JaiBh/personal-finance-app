"use client";

import { useQuery } from "convex/react";
import BudgetsChart from "./BudgetsChart";
import BudgetsInfo from "./BudgetsInfo";
import { api } from "../../../convex/_generated/api";

function BudgetsSummary() {
  const budgets = useQuery(api.budgets.get);
  if (!budgets || !budgets.length) {
    return (
      <div className="p-4 flex items-center justify-center">
        <h3 className="text-present-4">
          You have no budgets set up to this account...
        </h3>
      </div>
    );
  }
  const topBudgets = budgets
    .sort((a, b) => b.maxSpend - a.maxSpend)
    .slice(0, 4);
  return (
    <div className="flex flex-col gap-4">
      <BudgetsChart topBudgets={topBudgets}></BudgetsChart>
      <BudgetsInfo topBudgets={topBudgets}></BudgetsInfo>
    </div>
  );
}
export default BudgetsSummary;
