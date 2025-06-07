"use client";

import { useAction, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useEffect } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useCreateTransactionUser } from "@/features/transactionUsers/api/useCreateTransactionUser";
import { useGetUser } from "@/features/auth/api/useGetUser";
import { useCreateUserInfo } from "@/features/userInfo/api/useCreateUserInfo";
import { useCreateTransaction } from "@/features/transactions/api/useCreateTransaction";
import { useCreateBill } from "@/features/bills/api/useCreateBill";
import { useCreatePot } from "@/features/pots/api/useCreatePot";
import { useCreateBudget } from "@/features/budgets/api/useCreateBudget";

function FirstTimeLogin() {
  const action = useAction(api.avatars.generateAndStore);
  const { mutate } = useCreateTransactionUser();
  const { mutate: userInfoMutate } = useCreateUserInfo();
  const { mutate: transactionMutate } = useCreateTransaction();
  const { mutate: billMutate } = useCreateBill();
  const { mutate: potMutate } = useCreatePot();
  const { mutate: budgetMutate } = useCreateBudget();
  const starterTransactions = useQuery(api.transactions.getStarter) || [];
  const starterBills = useQuery(api.bills.getStarter) || [];
  const starterPots = useQuery(api.pots.getStarter) || [];
  const starterBudgets = useQuery(api.budgets.getStarter) || [];

  const { data: user, isLoading } = useGetUser();
  const image = user?.image;
  const name = user?.name || "";

  const initiateFirstTimeLogin = async () => {
    if (!isLoading) {
      let storageId: null | Id<"_storage"> = null;
      if (image) {
        storageId = await action({ imageUrl: image || null });
      }
      // generate transactionUser
      mutate(
        {
          category: "general",
          imageId: storageId,
          name,
        },
        {
          onSuccess(transactionUserId) {
            // generate userInfo
            if (transactionUserId) {
              userInfoMutate({
                balance: 483600,
                transactionUserId,
              });
            }
          },
        }
      );
    }

    starterBills.map((bill) => {
      const { amount, transactionUserId, billDayOfMonth, name } = bill;
      billMutate({ amount, transactionUserId, billDayOfMonth, name });
    });
    starterBudgets.map((budget) => {
      const { category, maxSpend, theme } = budget;
      budgetMutate({ category, maxSpend, theme });
    });
    starterPots.map((pot) => {
      const { amount, name, targetAmount, theme } = pot;
      potMutate({ amount, name, target: targetAmount, theme });
    });
    starterTransactions.map((transaction) => {
      const {
        transactionDate,
        transactionUserId,
        amount,
        name,
        category,
        recurringBill,
        senderOrRecipient,
      } = transaction;
      transactionMutate({
        transactionDate,
        transactionUserId,
        amount,
        name,
        category,
        recurringBill,
        senderOrRecipient,
      });
    });

    return;
  };

  useEffect(() => {
    initiateFirstTimeLogin();
  }, [isLoading]);

  // upload transactions

  // upload budgets

  // upload pots

  // upload bills

  return <div></div>;
}
export default FirstTimeLogin;
