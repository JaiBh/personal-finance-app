import { TableCell, TableRow } from "../ui/table";
import FallbackAvatar from "@/features/transactionUsers/components/FallbackAvatar";
import { Transaction, TransactionUser } from "@/generated/prisma";
import { format } from "date-fns";
import Image from "next/image";

function MobileListRow({
  transaction,
}: {
  transaction: Transaction & { transactionUser: TransactionUser };
}) {
  const dollars = `$${(Number(transaction.amount) / 100).toFixed(2)}`;
  return (
    <TableRow className="border-none">
      <TableCell className="flex items-center gap-3">
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
        <div className="space-y-1">
          <h4 className="text-present-4-bold">
            {transaction.transactionUser.name}
          </h4>
          <p className="text-present-5 text-grey-500 capitalize">
            {transaction.transactionUser.category.replace("-", " ")}
            {transaction.recurringBill && (
              <span className="lowercase italic text-primary"> (recurr)</span>
            )}
          </p>
        </div>
      </TableCell>
      <TableCell className="text-right">
        {transaction.recipient ? (
          <h4 className="text-present-4-bold text-secondary-green">
            +{dollars}
          </h4>
        ) : (
          <h4 className="text-present-4-bold">-{dollars}</h4>
        )}
        <p className="text-present-5 text-grey-500">
          {" "}
          {format(transaction.createdAt, "MMMM do, yyyy")}
        </p>
      </TableCell>
    </TableRow>
  );
}
export default MobileListRow;
