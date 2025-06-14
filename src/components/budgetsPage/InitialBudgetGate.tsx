"use client";

import { ClientBudget } from "../../../utils/types";
import { useCreateBudgetModal } from "@/features/budgets/store/useCreateBudgetModal";

interface InitialBudgetGateProps {
  budgets: ClientBudget[];
}

function InitialBudgetGate({ budgets }: InitialBudgetGateProps) {
  const [_modal, setModal] = useCreateBudgetModal();

  setModal({
    open: true,
    isForced: true,
    altText: "add first budget",
    budgets,
  });

  return null;
}
export default InitialBudgetGate;
