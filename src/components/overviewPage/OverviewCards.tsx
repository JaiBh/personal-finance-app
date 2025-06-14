import BillsCard from "./BillsCard";
import BudgetsCard from "./BudgetsCard";
import PotsCard from "./PotsCard";
import TransactionsCard from "./TransactionsCard";

function OverviewCards() {
  return (
    <section className="section-center 2xl:h-full overviewSummarySection grid gap-8 2xl:gap-4">
      <PotsCard></PotsCard>
      <TransactionsCard></TransactionsCard>
      <BudgetsCard></BudgetsCard>
      <BillsCard></BillsCard>
    </section>
  );
}
export default OverviewCards;
