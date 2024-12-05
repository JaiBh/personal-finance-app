import OverviewCards from "@/components/overview/OverviewCards";
import SummaryCards from "@/components/overview/SummaryCards";
import { SignOutButton } from "@/features/auth/components/SignOutButton";

function page() {
  return (
    <>
      <section className="section-center">
        <h1 className="page-title">overview</h1>
      </section>
      <section className="section-center">
        <SummaryCards></SummaryCards>
      </section>
      <section className="section-center">
        <OverviewCards></OverviewCards>
      </section>
      <SignOutButton></SignOutButton>
    </>
  );
}
export default page;
