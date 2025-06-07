"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { PiSortAscendingFill } from "react-icons/pi";
import { BsFillFunnelFill } from "react-icons/bs";
import FormSelect from "./FormSelect";
import FormDropdown from "./FormDropdown";
import FormSearchInput from "./FormSearchInput";
import { categoryOptions, sortByOptions } from "../../../utils/utils";

function TransactionsForm() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const moreCategoryOptions: { text: string; value: string }[] = [
    { value: "all", text: "all transactions" },
    ...categoryOptions.map((option) => {
      return { value: option, text: option.replace("-", " ") };
    }),
  ];
  const searchParam = searchParams.get("search") || "";
  const sortByParam = searchParams.get("sortBy") || sortByOptions[0].value;
  const categoryParam =
    searchParams.get("category") || moreCategoryOptions[0].value;

  const [search, setSearch] = useState(searchParam);
  const [sortBy, setSortBy] = useState(sortByParam);
  const [category, setCategory] = useState(categoryParam);

  const handleSearch = useDebouncedCallback(
    ({
      value,
      input,
    }: {
      value: string;
      input: "sortBy" | "search" | "category";
    }) => {
      const params = new URLSearchParams(searchParams);
      if (!value) {
        params.delete(input);
      } else {
        params.set(input, value);
      }
      replace(`/transactions?${params.toString()}`);
    },
    500
  );
  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
    if (!searchParams.get("sortBy")) {
      setSortBy("latest");
    }
    if (!searchParams.get("category")) {
      setCategory("all");
    }
  }, [
    searchParams.get("search"),
    searchParams.get("sortBy"),
    searchParams.get("category"),
  ]);

  return (
    <form className="grid gap-4 grid-cols-[1fr,_auto,_auto] items-center">
      <FormSearchInput
        handleSearch={handleSearch}
        placeholder="Search Transactions"
        setState={setSearch}
        state={search}
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
      <FormSelect
        options={moreCategoryOptions}
        state={category}
        setState={setCategory}
        handleSearch={handleSearch}
        label="Category"
        input="category"
        triggerWidth={177}
      ></FormSelect>
      <FormDropdown
        options={sortByOptions}
        state={sortBy}
        setState={setSortBy}
        handleSearch={handleSearch}
        input="sortBy"
        Icon={PiSortAscendingFill}
      ></FormDropdown>
      <FormDropdown
        options={moreCategoryOptions}
        state={category}
        setState={setCategory}
        handleSearch={handleSearch}
        input="category"
        Icon={BsFillFunnelFill}
      ></FormDropdown>
    </form>
  );
}
export default TransactionsForm;
