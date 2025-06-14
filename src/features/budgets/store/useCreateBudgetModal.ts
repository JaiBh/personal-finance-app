import { atom, useAtom } from "jotai";
import { ClientBudget } from "../../../../utils/types";

const modalState = atom<{
  open: boolean;
  isForced: boolean;
  altText: string;
  budgets: ClientBudget[];
}>({
  open: false,
  isForced: false,
  altText: "",
  budgets: [],
});

export const useCreateBudgetModal = () => {
  return useAtom(modalState);
};
