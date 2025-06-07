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
import { useGetPots } from "@/features/pots/api/useGetPots";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/useConfirm";
import { useWithdrawModal } from "@/features/pots/store/useWithdrawModal";
import { usePotTransfer } from "@/features/pots/api/usePotTransfer";
import { useGetUserInfo } from "@/features/userInfo/api/useGetUserInfo";
import { useCreateTransaction } from "@/features/transactions/api/useCreateTransaction";
import { TransactionUser } from "../../../utils/types";
import { useGetTransactionUsers } from "@/features/transactionUsers/api/useGetTransactionUsers";

function WithdrawModal() {
  const [modal, setModal] = useWithdrawModal();
  const { mutate: transactionMutate } = useCreateTransaction();
  const { mutate, isPending } = usePotTransfer();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "Are you sure you want to withdraw money from this pot?"
  );
  const pots = useGetPots().data || [];
  const { data: userInfo } = useGetUserInfo();
  const { data: transactionUsers } = useGetTransactionUsers();
  let transactionUser: TransactionUser | undefined;
  if (userInfo) {
    transactionUser = transactionUsers?.filter(
      (user) => userInfo.transactionUserId === user._id
    )[0];
  }

  // Get the first un-used category and theme
  const [originalAmount, setOriginalAmount] = useState<number>(0);
  const [subtract, setSubtract] = useState<number>(0);
  const [name, setName] = useState("");
  const [newAmount, setNewAmount] = useState<number>(0);
  const [target, setTarget] = useState<number>(0);

  useEffect(() => {
    const pot = pots.filter((pot) => {
      if (pot._id === modal.id) {
        return pot;
      }
    })[0];
    if (pot) {
      setOriginalAmount(pot.amount / 100);
      setNewAmount(pot.amount / 100);
      setName(pot.name);
      setTarget(pot.targetAmount / 100);
    }
  }, [setOriginalAmount, setName, setNewAmount, setTarget, pots, modal.open]);

  const handleClose = () => {
    setModal({ open: false, id: null });
    setOriginalAmount(0);
    setName("");
    setNewAmount(0);
    setTarget(0);
    setSubtract(0);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!modal.id || !transactionUser) {
      return;
    }

    const ok = await confirm();

    if (!ok) return;

    mutate(
      // @ts-ignore
      {
        change: subtract * 100,
        id: modal.id,
        addOrWithdraw: "withdraw",
        newAmount: newAmount * 100,
      },
      {
        onSuccess: () => {
          toast.success(`Funds withdrawn from ${name}!`);
          handleClose();
          transactionMutate({
            senderOrRecipient: "recipient",
            transactionUserId: transactionUser._id,
            amount: subtract * 100,
            category: "general",
            name: transactionUser.name,
            transactionDate: `2024-08-20`,
            recurringBill: false,
          });
        },
        onError: (error) => {
          toast.error(
            `Oops, something went wrong. Unable to withdraw funds from ${name}`
          );
          handleClose();
        },
        onSettled: () => {},
      }
    );
  };

  if (!userInfo || !transactionUser) return;

  return (
    <>
      <ConfirmDialog></ConfirmDialog>
      <Dialog open={modal.open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="text-present-1">Withdraw from '{name}'</span>
            </DialogTitle>
            <DialogDescription>
              <span className="text-present-4 text-grey-500">
                Withdraw from your pot to put money back in your main balance.
                This will reduce the amount you have in this pot.
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h4 className="text-present-4 text-grey-500">New Amount</h4>
              <h1 className="text-present-1">${originalAmount.toFixed(2)}</h1>
            </div>
            <div className="space-y-3">
              <div className="h-2 bg-background rounded flex items-center">
                <div
                  className="rounded h-full bg-grey-900 flex justify-end"
                  style={{
                    width: `${((originalAmount / target) * 100).toFixed(2)}%`,
                  }}
                >
                  <div
                    className="rounded-r h-full bg-secondary-red"
                    style={{
                      width: `${((subtract / originalAmount) * 100).toFixed(2)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-present-5-bold text-grey-500">
                  {((newAmount / target) * 100).toFixed(2)}%
                </p>
                <p className="text-present-5 text-grey-500">
                  Target of ${target}
                </p>
              </div>
            </div>
          </div>

          <form className="spacey-y-1" onSubmit={handleSubmit}>
            <label className="text-present-5-bold">Amount to Add</label>
            <div className="min-h-10 w-full rounded-md border border-border px-5 py-3 flex items-center gap-3">
              <span className="text-present-4 text-grey-500">$</span>
              <input
                type="number"
                className="w-full placeholder:text-grey-500 text-present-4 border-none outline-none"
                required
                min={0.01}
                max={originalAmount}
                value={subtract === 0 ? "" : subtract || ""}
                step="0.01"
                onChange={(e) => {
                  if (Number(e.target.value) > originalAmount) {
                    setSubtract(originalAmount);
                    setNewAmount(0);
                  } else {
                    setSubtract(roundDownToTwoDecimals(Number(e.target.value)));
                    setNewAmount(
                      originalAmount -
                        roundDownToTwoDecimals(Number(e.target.value))
                    );
                  }
                }}
              />
            </div>
            <Button
              variant={"primary"}
              className="w-full mt-4"
              type="submit"
              disabled={isPending}
            >
              Confirm Withdrawal
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default WithdrawModal;

function roundDownToTwoDecimals(num: number) {
  return Math.floor(num * 100) / 100;
}
