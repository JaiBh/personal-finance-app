import { format } from "date-fns";
import FallbackAvatar from "@/features/transactionUsers/components/FallbackAvatar";
import { Transaction, TransactionUser } from "@/generated/prisma";
import Image from "next/image";

async function RecentTransaction({
  transaction,
}: {
  transaction: Transaction & {
    transactionUser: TransactionUser;
  };
}) {
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {transaction.transactionUser.imageUrl ? (
          <Image
            src={transaction.transactionUser.imageUrl}
            alt="user avatar"
            priority
            height={32}
            width={32}
            className="object-cover"
            unoptimized
          ></Image>
        ) : (
          <FallbackAvatar
            name={transaction.transactionUser.name}
          ></FallbackAvatar>
        )}

        <h4 className="text-present-4-bold">{transaction.name}</h4>
      </div>
      <div className="flex flex-col justify-items-end gap-2 text-right">
        <h4
          className={`text-present-4-bold ${
            transaction.recipient && "text-secondary-green"
          }`}
        >
          {transaction.sender ? "+" : "-"}$
          {(Number(transaction.amount) / 100).toFixed(2)}
        </h4>
        <p className="text-present-5">
          {format(transaction.createdAt, "MMMM do, yyyy")}
        </p>
      </div>
    </li>
  );
}
export default RecentTransaction;
