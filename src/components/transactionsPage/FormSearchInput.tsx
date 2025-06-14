import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../ui/input";

import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface FormSearchInputProps {
  onSubmit: (value: string) => void;
  placeholder: string;
}

function FormSearchInput({ placeholder, onSubmit }: FormSearchInputProps) {
  const [searchValue, setSearchValue] = useState("");
  return (
    <form
      className="flex h-full w-full max-w-[420px] gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(searchValue);
      }}
    >
      <Input
        type="text"
        placeholder={placeholder}
        className="h-full bg-card"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      ></Input>
      <Button size={"sm"}>
        <Search className="size-4"></Search>
      </Button>
    </form>
  );
}
export default FormSearchInput;
