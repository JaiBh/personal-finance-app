import { atom, useAtom } from "jotai";
import { TimeFrameOptions } from "../../../../utils/types";

const beginning = new Date();
beginning.setDate(beginning.getDate() - 30);

type Filters = {
  category: string;
  sortBy: string;
  senderOrRecipient: string;
  recurring: string;
  searchTerm: string;
  interval: {
    type: TimeFrameOptions;
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
};

const defaultFilters: Filters = {
  category: "all",
  sortBy: "latest",
  recurring: "default",
  senderOrRecipient: "default",
  searchTerm: "",
  interval: { type: "all-time", startDate: undefined, endDate: undefined },
};

const transactionsFiltersState = atom<Filters>(defaultFilters);

export const useTransactionsFiltersAtom = () => {
  const [filters, setFilters] = useAtom(transactionsFiltersState);
  return { filters, setFilters, defaultFilters };
};
