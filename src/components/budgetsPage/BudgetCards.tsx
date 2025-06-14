import BudgetsSummaryCard from "./BudgetsSummaryCard";
import BudgetCard from "./BudgetCard";
import { ClientBudget } from "../../../utils/types";
import InitialBudgetGate from "./InitialBudgetGate";
import RedirectAuth from "../RedirectAuth";
import { currentUser } from "@clerk/nextjs/server";
import { prismadb } from "@/lib/prismadb";

interface BudgetCardsProps {
  budgets: ClientBudget[];
}

async function BudgetCards({ budgets }: BudgetCardsProps) {
  if (budgets.length < 1) {
    return <InitialBudgetGate budgets={budgets}></InitialBudgetGate>;
  }

  const user = await currentUser();
  if (!user) {
    return <RedirectAuth></RedirectAuth>;
  }

  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth());
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);

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

  return (
    <section className="section-center max-2xl:space-y-6 2xl:grid 2xl:grid-cols-[2fr,_3fr] 2xl:gap-6">
      <div>
        <BudgetsSummaryCard budgets={formattedBudgets}></BudgetsSummaryCard>
      </div>
      <div className="space-y-6">
        {formattedBudgets?.map((budget) => {
          return (
            <BudgetCard
              budget={budget}
              key={budget.id}
              budgets={budgets}
            ></BudgetCard>
          );
        })}
      </div>
    </section>
  );
}
export default BudgetCards;
