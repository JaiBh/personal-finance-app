import { atom, useAtom } from "jotai";
import { Id } from "../../../../convex/_generated/dataModel";

const modalState = atom<{ open: boolean; id: Id<"budgets"> | null }>({
  open: false,
  id: null,
});

export const useEditBudgetModal = () => {
  return useAtom(modalState);
};
