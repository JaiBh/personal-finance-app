"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { themeOptions } from "../../../utils/utils";
import axios from "axios";
import { useCreatePotModal } from "@/features/pots/store/useCreatePotModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CreatePotModal() {
  const [modal, setModal] = useCreatePotModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const usedThemes: string[] = [];
  const { pots } = modal;

  for (const { theme } of pots) {
    usedThemes.push(theme);
  }

  // Order categories and themes, displaying the used ones last
  const sortedThemeOptions: string[] = [
    ...themeOptions.filter((option) => !usedThemes.includes(option)),
    ...usedThemes,
  ];

  // Get the first un-used category and theme
  const [name, setName] = useState<string>("");
  const maxNameLength = 30;
  const [theme, setTheme] = useState<string>(sortedThemeOptions[0]);
  const [target, setTarget] = useState<number>(0);

  const handleClose = () => {
    setModal({ open: false, isForced: false, altText: "", pots: [] });
    setName("");
    setTheme(sortedThemeOptions[0]);
    setTarget(0);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usedThemes.includes(theme)) {
      // extra theme check
      toast.error("This theme is already in use");
      return;
    }
    try {
      setIsLoading(true);
      await axios.post("/api/pots", {
        targetAmount: target * 100,
        name,
        theme,
        amount: 0,
      });
      handleClose();
      toast.success("Pot Created!");
      router.refresh();
    } catch (err) {
      console.log("Error creating pot", err);
      toast.error("Something went wrong...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={modal.open}
      onOpenChange={() => {
        if (modal.isForced) {
          return;
        }
        handleClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-present-1 capitalize">
              {modal.altText ? modal.altText : "add new pot"}
            </span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-present-4 text-grey-500">
              Create a pot to set savings targets. These can help keep you on
              track as you save for special purchases.
            </span>
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-present-5-bold">Pot name</label>
            <div className="min-h-10 w-full rounded-md border border-border px-5 py-3">
              <input
                type="text"
                className="w-full placeholder:text-grey-500 text-present-4 border-none outline-none"
                placeholder="e.g. Rainy Days"
                required
                minLength={3}
                maxLength={maxNameLength}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <span
              className={`text-present-5 text-grey-500 text-end block ${
                maxNameLength - name.length === 0
                  ? "text-secondary-red"
                  : maxNameLength - name.length < 6 && "text-other-orange"
              }`}
            >
              {maxNameLength - name.length} characters left
            </span>
          </div>
          <div className="spacey-y-1-">
            <label className="text-present-5-bold">Target</label>
            <div className="min-h-10 w-full rounded-md border border-border px-5 py-3 flex items-center gap-3">
              <span className="text-present-4 text-grey-500">$</span>
              <input
                type="number"
                className="w-full placeholder:text-grey-500 text-present-4 border-none outline-none"
                placeholder="e.g. 2000"
                required
                min={20}
                step="0.01"
                onChange={(e) => {
                  setTarget(Number(e.target.value));
                }}
              />
            </div>
          </div>
          <div className="spacey-y-1">
            <label className="text-present-5-bold">Theme</label>
            <Select
              name="theme"
              value={theme}
              onValueChange={(e: string) => {
                setTheme(e);
              }}
            >
              <SelectTrigger className="text-present-4 capitalize">
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {sortedThemeOptions.map((theme, index) => {
                  const taken = usedThemes.includes(theme);
                  return (
                    <SelectItem key={index} value={theme} disabled={taken}>
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-3 rounded-[50%]`}
                          style={{ background: `hsl(var(--clr-${theme}))` }}
                        ></span>
                        <span className="text-present-4 capitalize">
                          {theme}
                        </span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Add Pot"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default CreatePotModal;
