import BillsForm from "@/components/billsPage/BillsForm";
import BillsList from "@/components/billsPage/BillsList";
import BillsSummary from "@/components/billsPage/BillsSummary";
import { prismadb } from "@/lib/prismadb";

async function page() {
  const rawBills = await prismadb.bill.findMany({
    where: {
      starter: true,
    },
  });
  const bills = rawBills.map((rawBill) => {
    return {
      ...rawBill,
      amount: Number(rawBill.amount),
      billDayOfMonth: Number(rawBill.billDayOfMonth),
    };
  });
  return (
    <div className="pb-6 space-y-6 lg:space-y-8">
      <section className="section-center">
        <h1 className="text-present-1 mt-6">Recurring Bills</h1>
      </section>
      <section className="section-center grid gap-6 2xl:grid-cols-[3fr_7fr] 2xl:items-start">
        <BillsSummary bills={bills}></BillsSummary>
        <div className="bg-card rounded-xl py-6 px-5 md:px-6 space-y-5 md:space-y-6">
          <BillsForm></BillsForm>
          <BillsList></BillsList>
        </div>
      </section>
    </div>
  );
}
export default page;
