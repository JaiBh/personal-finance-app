import { DebouncedState } from "use-debounce";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FormDropdownProps {
  options: { text: string; value: string }[];
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  input: "sortBy" | "category";
  handleSearch: DebouncedState<
    ({ value, input }: { value: string; input: string }) => void
  >;
  Icon: IconType;
}

function FormDropdown(props: FormDropdownProps) {
  const { options, state, setState, input, handleSearch, Icon } = props;
  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon size={20}></Icon>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="md:hidden">
          {options.map(({ value, text }, index) => {
            return (
              <DropdownMenuItem
                key={index}
                className={cn(
                  `${value === state && "font-bold"} justify-center`
                )}
                onClick={() => {
                  setState(value);
                  handleSearch({ value, input });
                }}
              >
                {text}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default FormDropdown;
