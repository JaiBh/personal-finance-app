import OverviewCardHeader from "./OverviewCardHeader";
import BillsSummary from "./BillsSummary";

function BillsCard() {
  return (
    <article className="bg-card py-6 px-5 rounded-xl grid gap-6">
      <OverviewCardHeader
        href={"/bills"}
        btnText={"See Details"}
        title={"Recurring Bills"}
      ></OverviewCardHeader>
      <BillsSummary></BillsSummary>
    </article>
  );
}
export default BillsCard;
