import { atom, useAtom } from "jotai";

const modalState = atom({
  open: false,
  isForced: false,
  altText: "",
});

export const useCreatePotModal = () => {
  return useAtom(modalState);
};
