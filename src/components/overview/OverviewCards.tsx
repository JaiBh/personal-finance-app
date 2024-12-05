import BillsCard from "./BillsCard";
import BudgetsCard from "./BudgetsCard";
import PotsCard from "./PotsCard";
import TransactionsCard from "./TransactionsCard";

function OverviewCards() {
  return (
    <div className="my-8 grid gap-4">
      <PotsCard></PotsCard>
      <TransactionsCard></TransactionsCard>
      <BudgetsCard></BudgetsCard>
      <BillsCard></BillsCard>
    </div>
  );
}
export default OverviewCards;
