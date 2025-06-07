import { atom, useAtom } from "jotai";

const loadingState = atom<{
  isLoading: boolean;
}>({
  isLoading: false,
});

export const useLoadingAtom = () => {
  return useAtom(loadingState);
};
