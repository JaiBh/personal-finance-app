"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClientBudget } from "../../../utils/types";
import { useCreateBudgetModal } from "@/features/budgets/store/useCreateBudgetModal";
import { categoryOptions } from "../../../utils/utils";

interface AddBudgetButtonProps {
  budgets: ClientBudget[];
}

function AddBudgetButton({ budgets }: AddBudgetButtonProps) {
  const [modal, setModal] = useCreateBudgetModal();
  const limitReached = budgets?.length === categoryOptions.length;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setModal({ ...modal, open: true, budgets })}
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
  );
}
export default AddBudgetButton;
