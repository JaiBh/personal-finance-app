import { ClientBudget, ClientTransaction } from "../../../utils/types";
import BudgetsChart from "./BudgetsChart";
import BudgetSummaryInfo from "./BudgetsSummaryInfo";

interface BudgetsSummaryCard {
  budgets: (ClientBudget & { relevantTransactions: ClientTransaction[] })[];
}

function BudgetsSummaryCard({ budgets }: BudgetsSummaryCard) {
  const chartData = budgets.map((budget) => {
    return {
      category: budget.category,
      maxSpend: budget.maxSpend / 100,
      theme: budget.theme,
    };
  });
  const totalSpend = budgets.reduce((acc, curr) => {
    return (acc += curr.relevantTransactions.reduce((acc, curr) => {
      return (acc += curr.amount);
    }, 0));
  }, 0);
  return (
    <article className="py-6 px-5 bg-card rounded-xl grid gap-[3.25rem] md:max-2xl:gap-8 md:max-2xl:grid-cols-2 md:max-2xl:p-8 md:max-2xl:items-center">
      <BudgetsChart
        chartData={chartData}
        totalSpend={totalSpend}
      ></BudgetsChart>
      <div className="space-y-6">
        <h2 className="text-present-2 capitalize">spending summary</h2>
        <ul className="space-y-6">
          {budgets?.map((budget) => {
            return (
              <BudgetSummaryInfo
                budget={budget}
                key={budget.id}
              ></BudgetSummaryInfo>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
export default BudgetsSummaryCard;
