import { atom, useAtom } from "jotai";
import { Pot, TransactionUser } from "@/generated/prisma";
import { ClientPot, ClientTransactionUser } from "../../../../utils/types";

const modalState = atom<{
  open: boolean;
  pot: ClientPot | undefined;
  transactionUser: ClientTransactionUser | undefined;
}>({
  open: false,
  pot: undefined,
  transactionUser: undefined,
});

export const useWithdrawModal = () => {
  return useAtom(modalState);
};
