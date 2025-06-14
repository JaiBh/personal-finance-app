import OverviewCards from "@/components/overviewPage/OverviewCards";
import SummaryCards from "@/components/overviewPage/SummaryCards";
import RedirectAuth from "@/components/RedirectAuth";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";

async function page() {
  const user = await currentUser();

  if (!user) {
    return <RedirectAuth></RedirectAuth>;
  }

  const rawTransactionUser = await prismadb.transactionUser.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!rawTransactionUser) {
    throw new Error("Unable to retrieve user information");
  }

  const transactionUser = {
    ...rawTransactionUser,
    balance: Number(rawTransactionUser?.balance),
  };

  return (
    <div className="pb-6 grid gap-8 2xl:grid-rows-[auto,_auto,_1fr] min-h-screen">
      <section className="section-center">
        <h1 className="text-present-1 mt-6">Overview</h1>
      </section>
      <SummaryCards transactionUser={transactionUser}></SummaryCards>
      <OverviewCards></OverviewCards>
    </div>
  );
}
export default page;
