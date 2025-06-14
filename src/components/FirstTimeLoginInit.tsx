import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import RedirectAuth from "./RedirectAuth";
import React from "react";

async function FirstTimeLoginInit({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (!user) {
    return <RedirectAuth></RedirectAuth>;
  }

  const transactionUser = await prismadb.transactionUser.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!transactionUser) {
    // create new transaction user
    await prismadb.transactionUser.create({
      data: {
        name: user.fullName || "User",
        category: "general",
        balance: 463676,
        imageUrl: user.imageUrl,
        userId: user.id,
      },
    });
    // create users pots
    const starterPots = await prismadb.pot.findMany({
      where: {
        starter: true,
      },
    });
    starterPots.map(async (pot) => {
      const { amount, targetAmount, name, theme } = pot;
      await prismadb.pot.create({
        data: {
          name,
          theme,
          targetAmount,
          amount,
          userId: user.id,
        },
      });
    });
    // create users budgets
    const starterBudgets = await prismadb.budget.findMany({
      where: {
        starter: true,
      },
    });
    starterBudgets.map(async (budget) => {
      const { theme, category, maxSpend } = budget;
      await prismadb.budget.create({
        data: {
          theme,
          category,
          maxSpend,
          userId: user.id,
        },
      });
    });
  }
  if (!transactionUser) return null;
  return <>{children}</>;
}
export default FirstTimeLoginInit;
