import SummaryCard from "./SummaryCard";

function SummaryCards() {
  return (
    <ul className="grid gap-3 md:grid-cols-3 md:gap-6">
      <SummaryCard text="Current Balance" amount={483600} active></SummaryCard>
      <SummaryCard text="Income" amount={381425}></SummaryCard>
      <SummaryCard text="Expenses" amount={170050}></SummaryCard>
    </ul>
  );
}
export default SummaryCards;
