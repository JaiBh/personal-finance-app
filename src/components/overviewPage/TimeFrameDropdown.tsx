"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DatePicker from "../DatePicker";
import { toast } from "sonner";
import { TimeFrameOptions } from "../../../utils/types";

interface TimeFrameDropdownProps {
  loading?: boolean;
  interval: {
    type: TimeFrameOptions;
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  onSubmit: ({
    type,
    startDate,
    endDate,
  }: {
    type: TimeFrameOptions;
    startDate: Date | undefined;
    endDate: Date | undefined;
  }) => void;
}

function TimeFrameDropdown({
  onSubmit,
  loading,
  interval,
}: TimeFrameDropdownProps) {
  const [open, setOpen] = useState(false);
  const [customStart, setCustomStart] = useState<Date | undefined>(undefined);
  const [customEnd, setCustomEnd] = useState<Date | undefined>(undefined);

  const updateInterval = (value: TimeFrameOptions) => {
    if (value === "custom") {
      if (!customStart || !customEnd) {
        toast.error("Please provide a start and end date");
        return;
      }
      if (customStart > customEnd) {
        toast.error("The end date cannot be before the start date");
        return;
      }
      onSubmit({
        startDate: customStart,
        endDate: customEnd,
        type: value,
      });
      setOpen(false);
      return;
    }
    if (value === "all-time") {
      onSubmit({ startDate: undefined, endDate: undefined, type: value });
      return;
    }

    const newStartDate = new Date();

    if (value === "30-days") {
      newStartDate.setDate(newStartDate.getDate() - 30);
    }
    if (value === "3-months") {
      newStartDate.setMonth(newStartDate.getMonth() - 3);
    }
    if (value === "1-year") {
      newStartDate.setFullYear(newStartDate.getFullYear() - 1);
    }

    onSubmit({ startDate: newStartDate, endDate: new Date(), type: value });
  };
  return (
    <>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Time Frame</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <h3 className="text-present-4-bold">Start Date</h3>
            <DatePicker
              date={customStart}
              setDate={setCustomStart}
            ></DatePicker>
          </div>
          <div className="space-y-3">
            <h3 className="text-present-4-bold">End Date</h3>
            <DatePicker date={customEnd} setDate={setCustomEnd}></DatePicker>
          </div>
          <Button
            className="mt-4"
            onClick={() => {
              updateInterval("custom");
            }}
          >
            Submit
          </Button>
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"default"}
            size={"sm"}
            disabled={loading}
            className="capitalize"
          >
            {interval.type.replace("-", " ")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => updateInterval("30-days")}>
            30 Days
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateInterval("3-months")}>
            3 Months
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateInterval("1-year")}>
            1 Year
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => updateInterval("all-time")}>
            All Time
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            Custom
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
export default TimeFrameDropdown;
