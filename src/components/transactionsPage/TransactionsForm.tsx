"use client";

import { PiSortAscendingFill } from "react-icons/pi";
import { BsFillFunnelFill, BsArrowRepeat } from "react-icons/bs";
import { LuArrowDownUp } from "react-icons/lu";
import FormSelect from "./FormSelect";
import FormDropdown from "./FormDropdown";
import FormSearchInput from "./FormSearchInput";
import { categoryOptions, sortByOptions } from "../../../utils/utils";
import { useTransactionsFiltersAtom } from "@/features/transactions/store/useTransactionsFiltersAtom";
import TimeFrameDropdown from "../overviewPage/TimeFrameDropdown";
import { Button } from "../ui/button";
import { useState } from "react";

function TransactionsForm() {
  const beginning = new Date();
  beginning.setDate(beginning.getDate() - 30);
  const {
    defaultFilters,
    filters,
    setFilters: setTransactionsFilters,
  } = useTransactionsFiltersAtom();

  const moreCategoryOptions: { text: string; value: string }[] = [
    { value: "all", text: "all transactions" },
    ...categoryOptions.map((option) => {
      return { value: option, text: option.replace("-", " ") };
    }),
  ];

  const resetFilters = () => {
    setTransactionsFilters({
      category: "all",
      sortBy: "latest",
      recurring: "default",
      senderOrRecipient: "default",
      searchTerm: "",
      interval: { type: "all-time", startDate: undefined, endDate: undefined },
    });
  };

  const onSearchSubmit = (searchValue: string) => {
    setTransactionsFilters({
      category: "all",
      sortBy: "latest",
      recurring: "default",
      senderOrRecipient: "default",
      searchTerm: searchValue,
      interval: { type: "all-time", startDate: undefined, endDate: undefined },
    });
  };

  return (
    <div className="space-y-4 sm:max-md:flex sm:max-md:items-center sm:max-md:justify-between sm:max-md:gap-5">
      <FormSearchInput
        placeholder="Search Transactions"
        onSubmit={onSearchSubmit}
      ></FormSearchInput>

      <div className="flex items-end gap-4 max-md:justify-end">
        <div className="max-md:hidden flex items-center gap-4">
          <FormSelect
            selected={filters.sortBy}
            options={sortByOptions}
            setFilters={(value: string) =>
              setTransactionsFilters({ ...filters, sortBy: value })
            }
            label="Sort By"
            triggerWidth={114}
          ></FormSelect>
          <FormSelect
            selected={filters.senderOrRecipient}
            options={[
              { text: "Default", value: "default" },
              { text: "Sender", value: "sender" },
              { text: "Recipient", value: "recipient" },
            ]}
            label="In/Out"
            setFilters={(value: string) =>
              setTransactionsFilters({ ...filters, senderOrRecipient: value })
            }
            triggerWidth={114}
          ></FormSelect>
          <FormSelect
            selected={filters.category}
            options={moreCategoryOptions}
            setFilters={(value: string) =>
              setTransactionsFilters({ ...filters, category: value })
            }
            label="Category"
            triggerWidth={177}
          ></FormSelect>
          <FormSelect
            options={[
              { text: "Default", value: "default" },
              { text: "Recurring", value: "recurring" },
              { text: "Non-recurring", value: "non-recurring" },
            ]}
            selected={filters.recurring}
            setFilters={(value: string) =>
              setTransactionsFilters({ ...filters, recurring: value })
            }
            label="Recurring"
            triggerWidth={177}
          ></FormSelect>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <FormDropdown
            options={[
              { text: "Default", value: "default" },
              { text: "Sender", value: "sender" },
              { text: "Recipient", value: "recipient" },
            ]}
            selected={filters.senderOrRecipient}
            setFilters={(value: string) =>
              setTransactionsFilters({ ...filters, senderOrRecipient: value })
            }
            Icon={LuArrowDownUp}
          ></FormDropdown>
          <FormDropdown
            options={sortByOptions}
            selected={filters.sortBy}
            setFilters={(value: string) =>
              setTransactionsFilters({ ...filters, sortBy: value })
            }
            Icon={PiSortAscendingFill}
          ></FormDropdown>
          <FormDropdown
            selected={filters.category}
            setFilters={(value: string) =>
              setTransactionsFilters({ ...filters, category: value })
            }
            options={moreCategoryOptions}
            Icon={BsFillFunnelFill}
          ></FormDropdown>
          <FormDropdown
            selected={filters.recurring}
            setFilters={(value: string) =>
              setTransactionsFilters({ ...filters, recurring: value })
            }
            options={[
              { text: "Default", value: "default" },
              { text: "Recurring", value: "recurring" },
              { text: "Non-recurring", value: "non-recurring" },
            ]}
            Icon={BsArrowRepeat}
          ></FormDropdown>
        </div>
        <TimeFrameDropdown
          onSubmit={(value) =>
            setTransactionsFilters({ ...filters, interval: value })
          }
          interval={filters.interval}
        ></TimeFrameDropdown>
        <Button
          variant={"destructive"}
          onClick={resetFilters}
          size={"sm"}
          disabled={filters === defaultFilters}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
export default TransactionsForm;
