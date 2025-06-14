import { categorizeBill } from "@/actions/categorizeBill";
import { prismadb } from "@/lib/prismadb";

async function BillsSummary() {
  const bills = await prismadb.bill.findMany({
    where: {
      starter: true,
    },
  });

  if (!bills || !bills.length) {
    return (
      <div className="p-4 flex items-center justify-center 2xl:flex 2xl:items-center 2xl:h-full">
        <h3 className="text-present-3 text-center">
          You have no recurring bills linked to this account...
        </h3>
      </div>
    );
  }
  const paidBills = bills.filter((bill) => {
    return categorizeBill(bill) === "paid";
  });

  const upcomingBills = bills.filter((bill) => {
    return categorizeBill(bill) === "upcoming";
  });
  const dueSoonBills = bills.filter((bill) => {
    return categorizeBill(bill) === "due soon";
  });

  return (
    <ul className="flex gap-2 flex-col">
      <li className="bg-background py-5 px-4 flex items-center justify-between border-l-[4px] border-secondary-green rounded-xl">
        <h4 className="text-present-4 capitalize text-grey-500">paid bills</h4>
        <h4 className="text-present-4-bold">
          $
          {(
            paidBills?.reduce((acc, curr) => acc + Number(curr.amount), 0) /
              100 || 0
          ).toFixed(2)}
        </h4>
      </li>
      <li className="bg-background py-5 px-4 flex items-center justify-between border-l-[4px] border-secondary-yellow rounded-xl">
        <h4 className="text-present-4 capitalize text-grey-500">
          total upcoming
        </h4>
        <h4 className="text-present-4-bold">
          $
          {(
            upcomingBills?.reduce((acc, curr) => acc + Number(curr.amount), 0) /
              100 || 0
          ).toFixed(2)}
        </h4>
      </li>
      <li className="bg-background py-5 px-4 flex items-center justify-between border-l-[4px] border-secondary-cyan rounded-xl">
        <h4 className="text-present-4 capitalize text-grey-500">due soon</h4>
        <h4 className="text-present-4-bold">
          $
          {(
            dueSoonBills?.reduce((acc, curr) => acc + Number(curr.amount), 0) /
              100 || 0
          ).toFixed(2)}
        </h4>
      </li>
    </ul>
  );
}
export default BillsSummary;
