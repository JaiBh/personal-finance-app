import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Transaction } from "../../../utils/types";
import LargeListRow from "./LargeListRow";

interface LargeTransactionsListProps {
  transactions: Transaction[];
}

function LargeTransactionsList({ transactions }: LargeTransactionsListProps) {
  return (
    <Table className="max-md:hidden">
      <TableHeader className="text-grey-500">
        <TableRow className="border-none">
          <TableHead className="text-present-5">Recipient / Sender</TableHead>
          <TableHead className="text-present-5">Category</TableHead>
          <TableHead className="text-present-5">
            Transaction <br></br> Date
          </TableHead>
          <TableHead className="text-present-5">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => {
          return (
            <LargeListRow
              key={transaction._id}
              transaction={transaction}
            ></LargeListRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default LargeTransactionsList;
