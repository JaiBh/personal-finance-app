import { DebouncedState } from "use-debounce";
import { IconType } from "react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
interface FormDropdownProps {
  options: { text: string; value: string }[];
  selected: string;
  setFilters: (value: string) => void;
  Icon: IconType;
}

function FormDropdown(props: FormDropdownProps) {
  const { options, selected, setFilters, Icon } = props;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Icon size={24}></Icon>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="md:hidden">
          {options.map(({ value, text }, index) => {
            return (
              <DropdownMenuItem
                key={index}
                onClick={() => {
                  setFilters(value);
                }}
                className={cn(
                  `${value === selected && "font-bold"} capitalize`
                )}
              >
                <div className="flex items-center gap-2">
                  <span>{text}</span>
                  {value === selected && <Check></Check>}
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default FormDropdown;
