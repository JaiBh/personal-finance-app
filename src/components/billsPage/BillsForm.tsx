"use client";

import { PiSortAscendingFill } from "react-icons/pi";
import FormSelect from "../transactionsPage/FormSelect";
import FormDropdown from "../transactionsPage/FormDropdown";
import FormSearchInput from "../transactionsPage/FormSearchInput";
import { sortByOptions } from "../../../utils/utils";
import { useBillsFiltersAtom } from "@/features/bills/store/useBillsFiltersAtom";

function BillsForm() {
  const { filters, setFilters } = useBillsFiltersAtom();

  const onSearchSubmit = (value: string) => {
    setFilters({ sortBy: "latest", searchTerm: value });
  };
  return (
    <div className="flex justify-between gap-8 items-center">
      <FormSearchInput
        placeholder="Search Bills"
        onSubmit={onSearchSubmit}
      ></FormSearchInput>
      <div className="max-md:hidden">
        <FormSelect
          flex={true}
          selected={filters.sortBy}
          options={sortByOptions}
          setFilters={(value: string) =>
            setFilters({ ...filters, sortBy: value })
          }
          label="Sort By"
          triggerWidth={114}
        ></FormSelect>
      </div>
      <div className="md:hidden">
        <FormDropdown
          options={sortByOptions}
          selected={filters.sortBy}
          setFilters={(value: string) =>
            setFilters({ ...filters, sortBy: value })
          }
          Icon={PiSortAscendingFill}
        ></FormDropdown>
      </div>
    </div>
  );
}
export default BillsForm;
