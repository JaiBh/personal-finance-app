import { atom, useAtom } from "jotai";
import { Id } from "../../../../convex/_generated/dataModel";

const modalState = atom<{ open: boolean; id: Id<"pots"> | null }>({
  open: false,
  id: null,
});

export const useEditPotModal = () => {
  return useAtom(modalState);
};
