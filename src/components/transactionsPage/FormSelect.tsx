import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../LoadingSpinner";

interface FormSelectsProps {
  selected: string;
  options: { text: string; value: string }[];
  label: string;
  triggerWidth: number;
  setFilters: (value: string) => void;
  flex?: boolean;
}

function FormSelect(props: FormSelectsProps) {
  const { options, label, triggerWidth, setFilters, selected, flex } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={cn(flex ? "flex items-center gap-2" : "space-y-2")}>
      <h4 className=" text-present-4 text-grey-500 text-center">{label}</h4>
      <Select
        value={selected}
        onValueChange={(e) => {
          setFilters(e);
        }}
      >
        <SelectTrigger
          className={cn(`w-[${triggerWidth}px] text-present-4 capitalize`)}
        >
          {mounted ? (
            <SelectValue></SelectValue>
          ) : (
            <LoadingSpinner className="w-6 h-6"></LoadingSpinner>
          )}
        </SelectTrigger>
        <SelectContent>
          {options.map(({ value, text }, index) => {
            return (
              <SelectItem key={index} value={value} className="capitalize">
                {text}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
export default FormSelect;
