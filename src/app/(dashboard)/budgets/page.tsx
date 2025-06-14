import AddBudgetButton from "@/components/budgetsPage/AddBudgetButton";
import BudgetCards from "@/components/budgetsPage/BudgetCards";
import RedirectAuth from "@/components/RedirectAuth";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";

async function page() {
  const user = await currentUser();
  if (!user) {
    return <RedirectAuth></RedirectAuth>;
  }
  const rawBudgets = await prismadb.budget.findMany({
    where: {
      userId: user.id,
    },
  });

  const budgets = rawBudgets.map((budget) => {
    return { ...budget, maxSpend: Number(budget.maxSpend) };
  });

  return (
    <div className="pb-6 space-y-6 lg:space-y-8">
      <section className="section-center flex justify-between mt-6 items-center">
        <h1 className="text-present-1">Budgets</h1>
        <AddBudgetButton budgets={budgets}></AddBudgetButton>
      </section>
      <BudgetCards budgets={budgets}></BudgetCards>
    </div>
  );
}
export default page;
