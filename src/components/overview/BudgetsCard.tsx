import BudgetsSummary from "./BudgetsSummary";
import OverviewCardHeader from "./OverviewCardHeader";

function BudgetsCard() {
  return (
    <article className="bg-card py-6 px-5 rounded-xl grid gap-6">
      <OverviewCardHeader
        href={"/budgets"}
        title={"Budgets"}
        btnText={"See Details"}
      ></OverviewCardHeader>
      <BudgetsSummary></BudgetsSummary>
    </article>
  );
}
export default BudgetsCard;
