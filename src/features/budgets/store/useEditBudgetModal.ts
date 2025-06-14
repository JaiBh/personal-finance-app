import { atom, useAtom } from "jotai";
import { ClientBudget } from "../../../../utils/types";

const modalState = atom<{
  open: boolean;
  budget: ClientBudget | undefined;
  budgets: ClientBudget[];
}>({
  open: false,
  budget: undefined,
  budgets: [],
});

export const useEditBudgetModal = () => {
  return useAtom(modalState);
};
