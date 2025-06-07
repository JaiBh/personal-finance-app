import { Dispatch, SetStateAction } from "react";
import { DebouncedState } from "use-debounce";
import { Input } from "../ui/input";
interface FormSearchInputProps {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  handleSearch: DebouncedState<
    ({ value, input }: { value: string; input: string }) => void
  >;
  placeholder: string;
}

function FormSearchInput({
  state,
  setState,
  handleSearch,
  placeholder,
}: FormSearchInputProps) {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      name="search"
      value={state}
      className="max-w-[320px]"
      onChange={(e) => {
        setState(e.target.value);
        handleSearch({ value: e.target.value, input: "search" });
      }}
    ></Input>
  );
}
export default FormSearchInput;
