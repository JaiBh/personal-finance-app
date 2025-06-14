import { Transaction, TransactionUser } from "@/generated/prisma";
import { Table, TableBody } from "../ui/table";
import MobileListRow from "./MobileListRow";

interface MobileTransactionsProps {
  transactions: (Transaction & { transactionUser: TransactionUser })[];
}

function MobileTransactionsList({ transactions }: MobileTransactionsProps) {
  return (
    <Table className="md:hidden">
      <TableBody>
        {transactions.map((transaction) => {
          return (
            <MobileListRow
              transaction={transaction}
              key={transaction.id}
            ></MobileListRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default MobileTransactionsList;
