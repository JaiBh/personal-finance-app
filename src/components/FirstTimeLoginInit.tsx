import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import RedirectAuth from "./RedirectAuth";
import React from "react";
import ClientRedirect from "./ClientRedirect";

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
  if (!transactionUser)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-muted-foreground mb-4">Setting up your account...</p>
        <ClientRedirect to="/" delay={1000} />{" "}
      </div>
    );
  return <>{children}</>;
}
export default FirstTimeLoginInit;
