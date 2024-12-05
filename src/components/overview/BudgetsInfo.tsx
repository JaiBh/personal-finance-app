import { Budget } from "../../../utils/types";

function BudgetsInfo({ topBudgets }: { topBudgets: Budget[] }) {
  return (
    <ul className="grid gap-y-4 grid-cols-2 md:grid-cols-1">
      {topBudgets?.map((budget) => {
        return (
          <li
            key={budget._id}
            className="pl-4 "
            style={{ borderLeft: `4px solid hsl(var(--clr-${budget.theme}))` }}
          >
            <span className="text-present-5 text-grey-500 capitalize">
              {budget.category}
            </span>
            <h4 className="text-present-4-bold mt-[3px]">
              ${(budget.maxSpend / 100).toFixed(2)}
            </h4>
          </li>
        );
      })}
    </ul>
  );
}
export default BudgetsInfo;
