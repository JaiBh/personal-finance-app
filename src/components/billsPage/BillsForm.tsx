"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { PiSortAscendingFill } from "react-icons/pi";
import FormSelect from "../transactionsPage/FormSelect";
import FormDropdown from "../transactionsPage/FormDropdown";
import FormSearchInput from "../transactionsPage/FormSearchInput";
import { sortByOptions } from "../../../utils/utils";

function BillsForm() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const searchParam = searchParams.get("search") || "";
  const sortByParam = searchParams.get("sortBy") || "oldest";

  const [search, setSearch] = useState(searchParam);
  const [sortBy, setSortBy] = useState(sortByParam);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
    if (!searchParams.get("sortBy")) {
      setSortBy("oldest");
    }
  }, [searchParams.get("search"), searchParams.get("sortBy")]);

  const handleSearch = useDebouncedCallback(
    ({ value, input }: { value: string; input: "sortBy" | "search" }) => {
      const params = new URLSearchParams(searchParams);
      if (!value) {
        params.delete(input);
      } else {
        params.set(input, value);
      }
      replace(`/bills?${params.toString()}`);
    },
    500
  );
  return (
    <form className="grid gap-4 grid-cols-[1fr,_auto] items-center">
      <FormSearchInput
        placeholder="Search Bills"
        state={search}
        handleSearch={handleSearch}
        setState={setSearch}
      ></FormSearchInput>
      <FormSelect
        options={sortByOptions}
        state={sortBy}
        setState={setSortBy}
        handleSearch={handleSearch}
        label="Sort By"
        input="sortBy"
        triggerWidth={114}
      ></FormSelect>
      <FormDropdown
        options={sortByOptions}
        state={sortBy}
        setState={setSortBy}
        handleSearch={handleSearch}
        input="sortBy"
        Icon={PiSortAscendingFill}
      ></FormDropdown>
    </form>
  );
}
export default BillsForm;
