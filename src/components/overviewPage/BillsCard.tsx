import OverviewCardHeader from "./OverviewCardHeader";
import BillsSummary from "./BillsSummary";

function BillsCard() {
  return (
    <article className="bg-card pb-6 pt-4 px-5 rounded-xl space-y-6 2xl:grid 2xl:grid-rows-[auto_fr]">
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
