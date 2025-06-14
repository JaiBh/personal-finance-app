import { prismadb } from "@/lib/prismadb";

async function DemoDataRefresher() {
  const shiftDate = await prismadb.shiftDate.findFirst({
    where: {
      id: "f7a932b1-3c2f-4f2a-87c1-1ab9f5d24689",
    },
  });

  if (!shiftDate) return;

  const today = new Date();
  const oldDate = new Date(shiftDate?.createdAt);
  const diffMs = today.getTime() - oldDate.getTime();
  const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (daysPassed > 0) {
    const transactions = await prismadb.transaction.findMany({
      where: {
        starter: true,
      },
    });
    transactions.map(async (transaction) => {
      const newTransactionDate = new Date(transaction.createdAt);
      newTransactionDate.setDate(newTransactionDate.getDate() + daysPassed);
      await prismadb.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          createdAt: newTransactionDate,
        },
      });
      if (transaction.recurringBill) {
        await prismadb.bill.updateMany({
          where: {
            transactionUserId: transaction.transactionUserId,
          },
          data: {
            billDayOfMonth: newTransactionDate.getDate(),
          },
        });
      }
    });
    await prismadb.shiftDate.update({
      where: {
        id: "f7a932b1-3c2f-4f2a-87c1-1ab9f5d24689",
      },
      data: {
        createdAt: new Date(),
      },
    });
  }
  return null;
}
export default DemoDataRefresher;
