import { Table, TableBody } from "../ui/table";

import { Transaction } from "../../../utils/types";
import MobileListRow from "./MobileListRow";

interface MobileTransactionsProps {
  transactions: Transaction[];
}

function MobileTransactionsList({ transactions }: MobileTransactionsProps) {
  return (
    <Table className="md:hidden">
      <TableBody>
        {transactions.map((transaction) => {
          return (
            <MobileListRow
              transaction={transaction}
              key={transaction._id}
            ></MobileListRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default MobileTransactionsList;
