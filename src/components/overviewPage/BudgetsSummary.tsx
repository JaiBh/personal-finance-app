import { prismadb } from "@/lib/prismadb";
import RouteLink from "../RouteLink";
import { Button } from "../ui/button";
import BudgetsInfo from "./BudgetsInfo";
import { currentUser } from "@clerk/nextjs/server";
import BudgetsChart from "../budgetsPage/BudgetsChart";
import RedirectAuth from "../RedirectAuth";

async function BudgetsSummary() {
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth());
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
  const user = await currentUser();
  if (!user) {
    return <RedirectAuth></RedirectAuth>;
  }
  const budgets = await prismadb.budget.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { maxSpend: "desc" },
  });

  const formattedBudgets = await Promise.all(
    budgets.map(async (budget) => {
      const rawTransactions = await prismadb.transaction.findMany({
        where: {
          OR: [
            {
              userId: user.id,
              sender: true,
              transactionUser: {
                category: budget.category,
              },
              createdAt: {
                gte: thisMonth,
                lt: nextMonth,
              },
            },
            {
              starter: true,
              sender: true,
              transactionUser: {
                category: budget.category,
              },
              createdAt: {
                gte: thisMonth,
                lt: nextMonth,
              },
            },
          ],
        },
        orderBy: { createdAt: "desc" },
      });
      const relevantTransactions = rawTransactions.map((item) => {
        return { ...item, amount: Number(item.amount) };
      });
      return { ...budget, relevantTransactions };
    })
  );

  const chartData = budgets.map((budget) => {
    return {
      category: budget.category,
      maxSpend: Number(budget.maxSpend) / 100,
      theme: budget.theme,
    };
  });

  const totalSpend = formattedBudgets.reduce((acc, curr) => {
    return (acc += curr.relevantTransactions.reduce((acc, curr) => {
      return (acc += curr.amount);
    }, 0));
  }, 0);

  if (!budgets || !budgets.length) {
    return (
      <div className="p-4 text-center space-y-4 2xl:flex 2xl:flex-col 2xl:items-center 2xl:h-full 2xl:justify-center">
        <h3 className="text-present-3">
          You have no budgets set up to this account...
        </h3>
        <Button asChild>
          <RouteLink href="/budgets">Create First Budget</RouteLink>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-y-4 md:grid-cols-[1fr,_auto] md:max-lg:py-6 2xl:justify-between">
      <BudgetsChart
        chartData={chartData}
        totalSpend={totalSpend}
      ></BudgetsChart>
      <BudgetsInfo topBudgets={budgets.slice(0, 4)}></BudgetsInfo>
    </div>
  );
}
export default BudgetsSummary;
