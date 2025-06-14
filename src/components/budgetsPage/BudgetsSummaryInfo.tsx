import { getBudgetInfo } from "@/actions/getBudgetInfo";
import { ClientBudget, ClientTransaction } from "../../../utils/types";

async function BudgetSummaryInfo({
  budget,
}: {
  budget: ClientBudget & { relevantTransactions: ClientTransaction[] };
}) {
  const { maxSpend, category, theme, relevantTransactions } = budget;

  const { spent } = getBudgetInfo(maxSpend, relevantTransactions);

  return (
    <li
      key={budget.id}
      style={{ borderLeftColor: `hsl(var(--clr-${theme}))` }}
      className="flex justify-between items-center border-l-4 pl-4"
    >
      <h4 className="text-present-4 text-grey-500 capitalize">
        {category.replace("-", " ")}
      </h4>
      <h3 className="text-present-3">
        ${(spent / 100).toFixed(2)}
        <span className="text-present-5 text-grey-500">
          {" "}
          of ${(maxSpend / 100).toFixed(2)}
        </span>
      </h3>
    </li>
  );
}
export default BudgetSummaryInfo;
