import { useGetBudgetInfo } from "@/hooks/useGetBudgetInfo";
import { Budget } from "../../../utils/types";
import { useGetTransactionsByCategoryMonthYearRecipientSender } from "@/features/transactions/api/useGetTransactionsByCategoryMonthYearRecipientSender";

function BudgetSummaryInfo({ budget }: { budget: Budget }) {
  const { maxSpend, category, theme } = budget;

  const { data: relevantTransactions } =
    useGetTransactionsByCategoryMonthYearRecipientSender({
      category,
      senderOrRecipient: "sender",
    });

  const { spent } = useGetBudgetInfo(maxSpend, relevantTransactions);

  return (
    <li
      key={budget._id}
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
