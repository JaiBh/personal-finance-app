"use client";

import { Button } from "@/components/ui/button";
import { useDeleteAuthAccount } from "@/features/auth/api/useDeleteAuthAccount";
import { useDeleteUser } from "@/features/auth/api/useDeleteUser";
import { useGetAuthAccount } from "@/features/auth/api/useGetAuthAccount";
import { useDeleteBill } from "@/features/bills/api/useDeleteBill";
import { useGetBills } from "@/features/bills/api/useGetBills";
import { useDeleteBudget } from "@/features/budgets/api/useDeleteBudget";
import { useGetBudgets } from "@/features/budgets/api/useGetBudgets";
import { useDeletePot } from "@/features/pots/api/useDeletePot";
import { useGetPots } from "@/features/pots/api/useGetPots";
import { useDeleteTransaction } from "@/features/transactions/api/useDeleteTransaction";
import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";
import { useDeleteAvatar } from "@/features/transactionUsers/api/useDeleteAvatar";
import { useDeleteTransactionUser } from "@/features/transactionUsers/api/useDeleteTransactionUser";
import { useGetTransactionUserByUserId } from "@/features/transactionUsers/api/useGetTransactionUserByUserId";
import { useDeleteUserInfo } from "@/features/userInfo/api/useDeleteUserInfo";
import { useGetUserInfo } from "@/features/userInfo/api/useGetUserInfo";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
function WipeUserButton() {
  const transactions = useGetTransactions().data || [];
  const budgets = useGetBudgets().data || [];
  const pots = useGetPots().data || [];
  const bills = useGetBills().data || [];
  const transactionUser = useGetTransactionUserByUserId().data;
  const userInfo = useGetUserInfo().data;
  const authAccount = useGetAuthAccount().data;
  const { mutate: transactionMutate } = useDeleteTransaction();
  const { mutate: billMutate } = useDeleteBill();
  const { mutate: budgetMutate } = useDeleteBudget();
  const { mutate: potMutate } = useDeletePot();
  const { mutate: avatarMutate } = useDeleteAvatar();
  const { mutate: transactionUserMutate } = useDeleteTransactionUser();
  const { mutate: userInfoMutate } = useDeleteUserInfo();
  const { mutate: userMutate } = useDeleteUser();
  const { mutate: authMutate } = useDeleteAuthAccount();

  const router = useRouter();
  const { signOut } = useAuthActions();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/auth");
  };

  const handleDelete = () => {
    transactions.map((transaction) => {
      transactionMutate({ id: transaction._id });
    });
    budgets.map((budget) => {
      budgetMutate({ id: budget._id });
    });
    pots.map((pot) => {
      potMutate({ id: pot._id });
    });
    bills.map((bill) => {
      billMutate({ id: bill._id });
    });
    if (transactionUser) {
      if (transactionUser.imageId) {
        avatarMutate({ id: transactionUser.imageId });
      }
      transactionUserMutate({ id: transactionUser._id });
    }
    if (userInfo) {
      userInfoMutate({ id: userInfo._id });
    }
    if (authAccount) {
      authMutate({ id: authAccount._id });
    }
    userMutate();
    handleSignOut();
  };
  return <Button onClick={handleDelete}>Delete Profile</Button>;
}
export default WipeUserButton;
