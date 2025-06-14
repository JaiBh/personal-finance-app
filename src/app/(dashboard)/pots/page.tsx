import AddPotButton from "@/components/potsPage/AddPotButton";
import PotsList from "../../../components/potsPage/PotsList";
import { prismadb } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";
import RedirectAuth from "@/components/RedirectAuth";

async function page() {
  const user = await currentUser();
  if (!user) {
    return <RedirectAuth></RedirectAuth>;
  }
  const rawPots = await prismadb.pot.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { createdAt: "asc" },
  });

  const pots = rawPots.map((item) => {
    return {
      ...item,
      amount: Number(item.amount),
      targetAmount: Number(item.targetAmount),
    };
  });

  const rawTransactionUser = await prismadb.transactionUser.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!rawTransactionUser) {
    return;
  }

  const transactionUser = {
    ...rawTransactionUser,
    balance: Number(rawTransactionUser?.balance) || null,
  };

  return (
    <div className="pb-6 space-y-6 lg:space-y-8">
      <section className="section-center flex justify-between mt-6 items-center">
        <h1 className="text-present-1">Pots</h1>
        <AddPotButton pots={pots}></AddPotButton>
      </section>
      <PotsList pots={pots} transactionUser={transactionUser}></PotsList>
    </div>
  );
}
export default page;
