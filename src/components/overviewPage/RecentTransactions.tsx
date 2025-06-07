import { Transaction } from "../../../utils/types";
import RecentTransaction from "./RecentTransaction";

function RecentTransactions({
  recentTransactions,
}: {
  recentTransactions: Transaction[] | undefined;
}) {
  return (
    <ul className="flex flex-col gap-10">
      {recentTransactions?.map((transaction) => (
        <RecentTransaction
          transaction={transaction}
          key={transaction._id}
        ></RecentTransaction>
      ))}
    </ul>
  );
}
export default RecentTransactions;
