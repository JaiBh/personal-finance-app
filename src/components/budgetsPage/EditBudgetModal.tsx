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
import { Category, Theme } from "../../../utils/types";
import { categoryOptions, themeOptions } from "../../../utils/utils";
import { useGetBudgets } from "@/features/budgets/api/useGetBudgets";
import { toast } from "sonner";
import { useEditBudgetModal } from "@/features/budgets/store/useEditBudgetModal";
import { useEditBudget } from "@/features/budgets/api/useEditBudget";

function EditBudgetModal() {
  const [modal, setModal] = useEditBudgetModal();
  const { mutate, isPending } = useEditBudget();

  const usedCategories: Category[] = [];
  const usedThemes: Theme[] = [];
  const budgets = useGetBudgets().data || [];

  for (const { category, theme } of budgets) {
    usedCategories.push(category);
    usedThemes.push(theme);
  }

  // Order categories and themes, displaying the used ones last
  const sortedCategoryOptions: Category[] = [
    ...categoryOptions.filter((option) => !usedCategories.includes(option)),
    ...usedCategories,
  ];
  const sortedThemeOptions: Theme[] = [
    ...themeOptions.filter((option) => !usedThemes.includes(option)),
    ...usedThemes,
  ];

  const [category, setCategory] = useState<Category>(sortedCategoryOptions[0]);
  const [theme, setTheme] = useState<Theme>(sortedThemeOptions[0]);
  const [maxSpend, setMaxSpend] = useState<number | null>(null);

  // Set up input/select values
  useEffect(() => {
    const budget = budgets.filter((budget) => {
      if (budget._id === modal.id) {
        return budget;
      }
    })[0];
    if (budget) {
      setCategory(budget.category);
      setTheme(budget.theme);
      setMaxSpend(budget.maxSpend / 100);
    }
  }, [setCategory, setTheme, setMaxSpend, budgets, modal.open]);

  const handleClose = () => {
    setModal({ open: false, id: null });
    setCategory(sortedCategoryOptions[0]);
    setTheme(sortedThemeOptions[0]);
    setMaxSpend(0);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      // @ts-ignore
      { maxSpend: maxSpend * 100, category, theme, id: modal.id },
      {
        onSuccess: () => {
          toast.success("Budget Created!");
          handleClose();
        },
        onError: (error) => {
          toast.error("Oops, something went wrong. Unable to edit budget");
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
            <span className="text-present-1 capitalize">Edit Budget</span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-present-4 text-grey-500">
              As your budgets change, feel free to update your spending limits.
            </span>
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-present-5-bold">Budget Category</label>
            <Select
              name="category"
              value={category}
              onValueChange={(e: Category) => {
                setCategory(e);
              }}
            >
              <SelectTrigger className="text-present-4 capitalize">
                <SelectValue></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {sortedCategoryOptions.map((value, index) => {
                  const taken = usedCategories.includes(value);
                  return (
                    <SelectItem
                      key={index}
                      value={value}
                      disabled={taken}
                      className="capitalize"
                    >
                      {value.replace("-", " ")}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="spacey-y-1-">
            <label className="text-present-5-bold">Maximum Spending</label>
            <div className="min-h-10 w-full rounded-md border border-border px-5 py-3 flex items-center gap-3">
              <span className="text-present-4 text-grey-500">$</span>
              <input
                type="number"
                className="w-full placeholder:text-grey-500 text-present-4 border-none outline-none"
                placeholder="e.g. 2000"
                required
                value={maxSpend === 0 ? "" : maxSpend || ""}
                min={20}
                step="0.01"
                onChange={(e) => {
                  setMaxSpend(Number(e.target.value));
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
            Edit Budget
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default EditBudgetModal;
