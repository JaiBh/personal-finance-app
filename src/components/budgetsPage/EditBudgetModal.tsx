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
import { categoryOptions, themeOptions } from "../../../utils/utils";
import { toast } from "sonner";
import { useEditBudgetModal } from "@/features/budgets/store/useEditBudgetModal";
import { useRouter } from "next/navigation";
import axios from "axios";

function EditBudgetModal() {
  const router = useRouter();
  const [modal, setModal] = useEditBudgetModal();
  const [loading, setLoading] = useState(true);

  const usedCategories: string[] = [];
  const usedThemes: string[] = [];
  const { budget, budgets } = modal;

  for (const { category, theme } of budgets) {
    if (category !== budget?.category) {
      usedCategories.push(category);
    }
    if (theme !== budget?.theme) {
      usedThemes.push(theme);
    }
  }

  // Order categories and themes, displaying the used ones last
  const sortedCategoryOptions: string[] = [
    ...categoryOptions.filter((option) => !usedCategories.includes(option)),
    ...usedCategories,
  ];
  const sortedThemeOptions: string[] = [
    ...themeOptions.filter((option) => !usedThemes.includes(option)),
    ...usedThemes,
  ];

  const [category, setCategory] = useState<string>(sortedCategoryOptions[0]);
  const [theme, setTheme] = useState<string>(sortedThemeOptions[0]);
  const [maxSpend, setMaxSpend] = useState<number>(0);

  // Set up input/select values
  useEffect(() => {
    if (budget) {
      setLoading(true);
      setCategory(budget.category);
      setTheme(budget.theme);
      setMaxSpend(budget.maxSpend / 100);
      setLoading(false);
    }
  }, [budget]);

  const handleClose = () => {
    setModal({ open: false, budget: undefined, budgets: [] });
    setCategory(sortedCategoryOptions[0]);
    setTheme(sortedThemeOptions[0]);
    setMaxSpend(0);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (budget?.theme !== theme && usedThemes.includes(theme)) {
      // extra theme check
      toast.error("This theme is already in use");
      return;
    }
    if (budget?.category !== category && usedCategories.includes(category)) {
      // extra theme check
      toast.error("This theme is already in use");
      return;
    }
    try {
      setLoading(true);
      await axios.patch(`/api/budgets/${budget?.id}`, {
        category,
        maxSpend: maxSpend * 100,
        theme,
      });
      handleClose();
      toast.success("Budget Updated!");
      router.refresh();
    } catch (err) {
      console.log("Error updating budget", err);
    } finally {
      setLoading(false);
    }
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
              onValueChange={(e: string) => {
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
          <Button className="w-full" type="submit" disabled={loading}>
            Edit Budget
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default EditBudgetModal;
