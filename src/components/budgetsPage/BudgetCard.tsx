import { Budget } from "../../../utils/types";
import { Button } from "../ui/button";
import { GoTriangleRight } from "react-icons/go";
import { useGetTransactionsByCategoryMonthYearRecipientSender } from "@/features/transactions/api/useGetTransactionsByCategoryMonthYearRecipientSender";
import { convertDateToText } from "../../../utils/utils";
import avatar from "@/assets/sebastian-cook.svg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useEditBudgetModal } from "@/features/budgets/store/useEditBudgetModal";
import React from "react";
import { useGetBudgetInfo } from "@/hooks/useGetBudgetInfo";
import { useDeleteBudget } from "@/features/budgets/api/useDeleteBudget";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/useConfirm";
import RouteLink from "../RouteLink";

interface BudgetCardProps {
  budget: Budget;
}

function BudgetCard({ budget }: BudgetCardProps) {
  const [_editModal, setEditModal] = useEditBudgetModal();
  const { mutate, isPending } = useDeleteBudget();
  const [ConfirmDialog, confirm] = useConfirm(
    `delete '${budget.category}'?`,
    "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
  );

  const { maxSpend, category, theme, _id: id } = budget;
  const { data: relevantTransactions } =
    useGetTransactionsByCategoryMonthYearRecipientSender({
      category,
      senderOrRecipient: "sender",
    });
  const { spent, free } = useGetBudgetInfo(maxSpend, relevantTransactions);
  let percentageSpent = (spent / maxSpend) * 100;
  if (percentageSpent > 100) {
    percentageSpent = 100;
  }

  const deleteBudget = async () => {
    const ok = await confirm();

    if (!ok) return;
    mutate(
      {
        id: budget._id,
      },
      {
        onSuccess() {
          toast.success("Budget removed");
        },
        onError() {
          toast.error("Failed to remove budget");
        },
      }
    );
  };

  const editModal = () => {
    setEditModal({ open: true, id });
  };

  return (
    <>
      <ConfirmDialog></ConfirmDialog>
      <article className="bg-card rounded-xl py-6 px-5">
        {/* TITLE */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className="size-4 rounded-[50%]"
              style={{ backgroundColor: `hsl(var(--clr-${theme}))` }}
            ></div>
            <h2 className="text-present-2 capitalize">
              {category.replace("-", " ")}
            </h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none space-y-1" align="end">
              <DropdownMenuItem className="text-present-4" onClick={editModal}>
                Edit Budget
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-present-4 text-secondary-red focus:text-secondary-red"
                onClick={deleteBudget}
                disabled={isPending}
              >
                Delete Budget
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* SPENT/REMAINING */}
        <div className="space-y-4 mb-4">
          <h4 className="text-present-4 text-grey-500">
            Maximum of ${(maxSpend / 100).toFixed(2)}
          </h4>
          <div className="p-1 bg-background rounded-md">
            <div
              className={`rounded-md h-6`}
              style={{
                backgroundColor: `hsl(var(--clr-${theme}))`,
                width: `${percentageSpent}%`,
              }}
            ></div>
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-4">
              <div
                className="w-1 h-full rounded"
                style={{ backgroundColor: `hsl(var(--clr-${theme}))` }}
              ></div>
              <div className="space-y-1">
                <p className="text-present-5 txt-grey-500">Spent</p>
                <h4 className="text-present-4-bold">
                  ${(spent / 100).toFixed(2)}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-1 h-full rounded bg-secondary-yellow"></div>
              <div className="space-y-1">
                <p className="text-present-5 txt-grey-500">Remaining</p>
                <h4 className="text-present-4-bold">
                  ${(free / 100).toFixed(2)}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* LATEST SPENDING */}
        <div className="bg-background p-4 rounded">
          <div className="flex items-center justify-between mb-2">
            <h3 className="capitalize text-present-3">latest spending</h3>
            <Button asChild variant={"tertiary"}>
              <RouteLink href={`/transactions?category=${category}`}>
                <span className="text-present-4">See All</span>
                <GoTriangleRight className="text-sm"></GoTriangleRight>
              </RouteLink>
            </Button>
          </div>
          <ul className="bg-grey-500/20 grid gap-y-[1px]">
            {relevantTransactions?.slice(0, 3).map((transaction) => {
              const { _id, name, amount, transactionDate } = transaction;
              const { year, month, day } = convertDateToText(
                new Date(transactionDate)
              );
              return (
                <li
                  key={_id}
                  className="py-3 bg-background flex items-center justify-between"
                >
                  <div className="md:flex md:items-center md:gap-3">
                    <Image
                      src={avatar}
                      priority
                      alt="avatar"
                      height={32}
                      width={32}
                      className="size-8 max-md:hidden"
                    ></Image>
                    <p className="text-present-5-bold">{name}</p>
                  </div>
                  <div className="text-end space-y-1">
                    <p className="text-present-5-bold">
                      -${(amount / 100).toFixed(2)}
                    </p>
                    <p className="text-present-5 text-grey-500">
                      {day} {month} {year}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </article>
    </>
  );
}
export default BudgetCard;
