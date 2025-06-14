import { atom, useAtom } from "jotai";

const beginning = new Date();
beginning.setDate(beginning.getDate() - 30);

type Filters = {
  sortBy: string;

  searchTerm: string;
};

const defaultFilters: Filters = {
  sortBy: "latest",

  searchTerm: "",
};

const BillsFiltersState = atom<Filters>(defaultFilters);

export const useBillsFiltersAtom = () => {
  const [filters, setFilters] = useAtom(BillsFiltersState);
  return { filters, setFilters, defaultFilters };
};
