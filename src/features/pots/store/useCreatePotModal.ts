import { atom, useAtom } from "jotai";
import { ClientPot } from "../../../../utils/types";

const modalState = atom<{
  open: boolean;
  isForced: boolean;
  altText: string;
  pots: ClientPot[];
}>({
  open: false,
  isForced: false,
  altText: "",
  pots: [],
});

export const useCreatePotModal = () => {
  return useAtom(modalState);
};
