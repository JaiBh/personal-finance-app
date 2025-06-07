import BudgetsSummary from "./BudgetsSummary";
import OverviewCardHeader from "./OverviewCardHeader";

function BudgetsCard() {
  return (
    <article className="bg-card pb-6 pt-4 px-5 rounded-xl space-y-6 2xl:grid 2xl:grid-rows-[auto_1fr]">
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
