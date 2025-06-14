import { Pot } from "@/generated/prisma";
import { atom, useAtom } from "jotai";
import { ClientPot } from "../../../../utils/types";

const modalState = atom<{
  open: boolean;

  pots: ClientPot[];
  pot: ClientPot | undefined;
}>({
  open: false,
  pots: [],
  pot: undefined,
});

export const useEditPotModal = () => {
  return useAtom(modalState);
};
