"use client";

import { useGetBudgets } from "@/features/budgets/api/useGetBudgets";
import BudgetsSummaryCard from "./BudgetsSummaryCard";
import BudgetCard from "./BudgetCard";
import { useCreateBudgetModal } from "@/features/budgets/store/useCreateBudgetModal";
import { useEffect } from "react";
import Spinner from "../Spinner";

function BudgetCards() {
  const { data: budgets, isLoading } = useGetBudgets();
  const [_modal, setModal] = useCreateBudgetModal();

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (!budgets || budgets?.length < 1) {
      setModal({
        open: true,
        isForced: true,
        altText: "add first budget",
      });
    }
  }, [isLoading, budgets, setModal]);

  if (isLoading) {
    return (
      <div className="section-center p-6 bg-card">
        <Spinner></Spinner>
      </div>
    );
  }

  if (!budgets?.length || !budgets) {
    return;
  }

  return (
    <section className="section-center max-2xl:space-y-6 2xl:grid 2xl:grid-cols-[2fr,_3fr] 2xl:gap-6">
      <div>
        <BudgetsSummaryCard></BudgetsSummaryCard>
      </div>
      <div className="space-y-6">
        {budgets?.map((budget) => {
          return <BudgetCard budget={budget} key={budget._id}></BudgetCard>;
        })}
      </div>
    </section>
  );
}
export default BudgetCards;
