import { DebouncedState } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface FormSelectsProps {
  options: { text: string; value: string }[];
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  input: "sortBy" | "category";
  handleSearch: DebouncedState<
    ({ value, input }: { value: string; input: string }) => void
  >;
  label: string;
  triggerWidth: number;
}

function FormSelect(props: FormSelectsProps) {
  const { options, state, setState, input, handleSearch, label, triggerWidth } =
    props;
  return (
    <div className="max-md:hidden flex gap-2 items-center">
      <h4 className=" text-present-4 text-grey-500 text-nowrap">{label}</h4>
      <Select
        name={input}
        value={state}
        onValueChange={(e) => {
          setState(e);
          handleSearch({ value: e, input });
        }}
      >
        <SelectTrigger
          className={cn(`w-[${triggerWidth}px] text-present-4 capitalize`)}
        >
          <SelectValue></SelectValue>
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
