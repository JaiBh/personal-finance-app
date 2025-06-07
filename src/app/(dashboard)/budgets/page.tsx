"use client";

import BudgetCards from "@/components/budgetsPage/BudgetCards";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetBudgets } from "@/features/budgets/api/useGetBudgets";
import { useCreateBudgetModal } from "@/features/budgets/store/useCreateBudgetModal";
import { categoryOptions } from "../../../../utils/utils";
function page() {
  const [modal, setModal] = useCreateBudgetModal();
  const { data: budgets } = useGetBudgets();
  const limitReached = budgets?.length === categoryOptions.length;

  return (
    <div className="pb-6 grid gap-6 lg:gap-8">
      <section className="section-center flex justify-between mt-6 items-center">
        <h1 className="text-present-1">Budgets</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setModal({ ...modal, open: true })}
                disabled={limitReached}
              >
                {limitReached ? "Budgets Limit Reached" : "+ Add New Budget"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {limitReached ? (
                <p>You've reached your limit of budgets</p>
              ) : (
                <p>Create a new budget</p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>
      <BudgetCards></BudgetCards>
    </div>
  );
}
export default page;
