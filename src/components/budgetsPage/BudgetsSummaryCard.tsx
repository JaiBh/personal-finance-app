import { useGetBudgets } from "@/features/budgets/api/useGetBudgets";
import BudgetsChart from "../overviewPage/BudgetsChart";
import BudgetSummaryInfo from "./BudgetsSummaryInfo";

function BudgetsSummaryCard() {
  const { data: budgets } = useGetBudgets();
  return (
    <article className="py-6 px-5 bg-card rounded-xl grid gap-[3.25rem] md:max-2xl:gap-8 md:max-2xl:grid-cols-2 md:max-2xl:p-8 md:max-2xl:items-center">
      <BudgetsChart></BudgetsChart>
      <div className="space-y-6">
        <h2 className="text-present-2 capitalize">spending summary</h2>
        <ul className="space-y-6">
          {budgets?.map((budget) => {
            return (
              <BudgetSummaryInfo
                budget={budget}
                key={budget._id}
              ></BudgetSummaryInfo>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
export default BudgetsSummaryCard;
