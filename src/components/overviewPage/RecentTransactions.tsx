import { Transaction, TransactionUser } from "@/generated/prisma";
import RecentTransaction from "./RecentTransaction";

function RecentTransactions({
  recentTransactions,
}: {
  recentTransactions: (Transaction & { transactionUser: TransactionUser })[];
}) {
  return (
    <ul className="flex flex-col gap-10">
      {recentTransactions?.map((transaction) => (
        <RecentTransaction
          transaction={transaction}
          key={transaction.id}
        ></RecentTransaction>
      ))}
    </ul>
  );
}
export default RecentTransactions;
