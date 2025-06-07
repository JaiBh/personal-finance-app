"use client";

import { useEffect, useState } from "react";
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
import { Theme } from "../../../utils/types";
import { themeOptions } from "../../../utils/utils";
import { toast } from "sonner";
import { useGetPots } from "@/features/pots/api/useGetPots";
import { useEditPotModal } from "@/features/pots/store/useEditPotModal";
import { useEditPot } from "@/features/pots/api/useEditPot";

function EditPotModal() {
  const [modal, setModal] = useEditPotModal();
  const { mutate, isPending } = useEditPot();
  const usedThemes: Theme[] = [];
  const pots = useGetPots().data || [];

  for (const { theme } of pots) {
    usedThemes.push(theme);
  }

  // Order categories and themes, displaying the used ones last
  const sortedThemeOptions: Theme[] = [
    ...themeOptions.filter((option) => !usedThemes.includes(option)),
    ...usedThemes,
  ];

  // Get the first un-used category and theme
  const [name, setName] = useState<string>("");
  const maxNameLength = 30;
  const [theme, setTheme] = useState<Theme>(sortedThemeOptions[0]);
  const [target, setTarget] = useState<number>(0);

  // Set up input/select values
  useEffect(() => {
    const pot = pots.filter((pot) => {
      if (pot._id === modal.id) {
        return pot;
      }
    })[0];
    if (pot) {
      setName(pot.name);
      setTheme(pot.theme);
      setTarget(pot.targetAmount / 100);
    }
  }, [setName, setTheme, setTarget, pots, modal.open]);

  const handleClose = () => {
    setModal({ open: false, id: null });
    setName("");
    setTheme(sortedThemeOptions[0]);
    setTarget(0);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      // @ts-ignore
      { target: target * 100, name, theme, id: modal.id },
      {
        onSuccess: () => {
          toast.success(`${name} Edited!`);
          handleClose();
        },
        onError: (error) => {
          toast.error(
            `Oops, something went wrong. Unable to edit pot ${{ name }}`
          );
          handleClose();
        },
        onSettled: () => {},
      }
    );
  };

  return (
    <Dialog open={modal.open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-present-1 capitalize"> edit pot </span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-present-4 text-grey-500">
              If your saving targets change, feel free to update your pots.
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
                value={name}
                minLength={3}
                maxLength={maxNameLength}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <span
              className={`text-present-5 text-grey-500 text-end block ${maxNameLength - name.length === 0 ? "text-secondary-red" : maxNameLength - name.length < 6 && "text-other-orange"}`}
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
                value={target === 0 ? "" : target || ""}
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
              onValueChange={(e: Theme) => {
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
          <Button
            variant={"primary"}
            className="w-full"
            type="submit"
            disabled={isPending}
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default EditPotModal;
