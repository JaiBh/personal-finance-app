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
import { categoryOptions, themeOptions } from "../../../utils/utils";
import { toast } from "sonner";
import { useCreateBudgetModal } from "@/features/budgets/store/useCreateBudgetModal";
import { useRouter } from "next/navigation";
import axios from "axios";

function CreateBudgetModal() {
  const [modal, setModal] = useCreateBudgetModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const usedCategories: string[] = [];
  const usedThemes: string[] = [];
  const { budgets } = modal;

  for (const { category, theme } of budgets) {
    usedCategories.push(category);
    usedThemes.push(theme);
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

  // Get the first un-used category and theme
  const [category, setCategory] = useState<string>(sortedCategoryOptions[0]);
  const [theme, setTheme] = useState<string>(sortedThemeOptions[0]);
  const [maxSpend, setMaxSpend] = useState<number>(0);

  const handleClose = () => {
    setModal({ open: false, isForced: false, altText: "", budgets: [] });
    setCategory(sortedCategoryOptions[0]);
    setTheme(sortedThemeOptions[0]);
    setMaxSpend(0);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usedThemes.includes(theme)) {
      // extra theme check
      toast.error("This theme is already in use");
      return;
    }
    if (usedCategories.includes(category)) {
      // extra theme check
      toast.error("This category is already in use");
      return;
    }
    try {
      setIsLoading(true);
      await axios.post("/api/budgets", {
        category,
        maxSpend: maxSpend * 100,
        theme,
      });
      handleClose();
      toast.success("Budget Created!");
      router.refresh();
    } catch (err) {
      console.log("Error creating budget", err);
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
              {modal.altText ? modal.altText : "add new budget"}
            </span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-present-4 text-grey-500">
              Choose a category to set a spending budget. These categories can
              help you monitor spending.
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
          <Button className="w-full" type="submit" disabled={isLoading}>
            Add Budget
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default CreateBudgetModal;
