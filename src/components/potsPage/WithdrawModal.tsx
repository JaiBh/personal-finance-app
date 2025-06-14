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
import { toast } from "sonner";
import { useConfirm } from "@/hooks/useConfirm";
import { useWithdrawModal } from "@/features/pots/store/useWithdrawModal";
import { useRouter } from "next/navigation";
import axios from "axios";

function WithdrawModal() {
  const [modal, setModal] = useWithdrawModal();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "Are you sure you want to withdraw money from this pot?"
  );
  const { pot, transactionUser } = modal;

  // Get the first un-used category and theme
  const [originalAmount, setOriginalAmount] = useState<number>(0);
  const [subtract, setSubtract] = useState<number>(0);
  const [name, setName] = useState("");
  const [newAmount, setNewAmount] = useState<number>(0);
  const [target, setTarget] = useState<number>(0);

  useEffect(() => {
    if (pot) {
      setOriginalAmount(pot.amount / 100);
      setNewAmount(pot.amount / 100);
      setName(pot.name);
      setTarget(pot.targetAmount / 100);
      setLoading(false);
    }
  }, [pot]);

  const handleClose = () => {
    setModal({ open: false, pot: undefined, transactionUser: undefined });
    setOriginalAmount(0);
    setName("");
    setNewAmount(0);
    setTarget(0);
    setSubtract(0);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pot || !transactionUser?.balance) {
      return;
    }

    const ok = await confirm();

    if (!ok) return;

    try {
      setLoading(true);
      // add to pot
      await axios.patch(`/api/pots/${pot.id}`, {
        amount: newAmount * 100,
        name: pot.name,
        targetAmount: pot.targetAmount,
        theme: pot.theme,
      });

      // change balance
      try {
        await axios.patch(`/api/transactionUsers/${transactionUser.id}`, {
          balance: (transactionUser.balance / 100 + subtract) * 100,
        });

        // create transaction
        try {
          await axios.post("/api/transactions", {
            amount: subtract * 100,
            recipient: true,
          });
          toast.success("Funds withdrawn from pot!");
          handleClose();
          router.refresh();
        } catch (err) {
          toast.error("Something went wrong...");
          console.log("Error creating new transaction", err);

          // reverse pot patch
          await axios.patch(`/api/pots/${pot.id}`, {
            amount: pot.amount,
            theme: pot.theme,
            name,
            targetAmount: pot.targetAmount,
          });

          // reverse balance patch
          await axios.patch(`/api/transactionUsers/${transactionUser.id}`, {
            balance: transactionUser.balance,
          });
        }
      } catch (err) {
        toast.error("Something went wrong...");
        console.log("Error patching transaction user balance", err);
        // reverse pot patch
        await axios.patch(`/api/pots/${pot.id}`, {
          amount: pot.amount,
          theme: pot.theme,
          name,
          targetAmount: pot.targetAmount,
        });
      }
    } catch (err) {
      console.log("Error adding money to pot", err);
      toast.error("Something went wrong...");
    } finally {
      setLoading(false);
    }
  };

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
                      width: `${((subtract / originalAmount) * 100).toFixed(
                        2
                      )}%`,
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
            <Button className="w-full mt-4" type="submit" disabled={loading}>
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
