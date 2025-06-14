import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { formatDayWithOrdinal } from "../../../utils/utils";
import { Bill, TransactionUser } from "@/generated/prisma";
import { categorizeBill } from "@/actions/categorizeBill";
import { cn } from "@/lib/utils";

interface LargeBillsListProps {
  bills: (Bill & { transactionUser: TransactionUser })[];
}

function LargeBillsList({ bills }: LargeBillsListProps) {
  return (
    <Table className="max-md:hidden">
      <TableHeader className="text-grey-500">
        <TableRow className="border-none">
          <TableHead className="text-present-5">Bill Title</TableHead>
          <TableHead className="text-present-5">Due Date</TableHead>
          <TableHead className="text-present-5">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bills.map((bill) => {
          const { id, name, amount, billDayOfMonth } = bill;
          const dollars = `$${(Number(amount) / 100).toFixed(2)}`;
          const billStatus = categorizeBill(bill);
          return (
            <TableRow className="border-none" key={id}>
              <TableCell className="flex items-center gap-4">
                <Image
                  src={bill.transactionUser.imageUrl}
                  alt="user avatar"
                  priority
                  height={32}
                  width={32}
                  className="object cover"
                ></Image>
                <h4 className="text-present-4-bold">{name}</h4>
              </TableCell>
              <TableCell className="text-present-5">
                <div className="flex gap-2 items-center">
                  <span
                    className={cn(
                      "capitalize",
                      billStatus === "paid" && "text-secondary-green"
                    )}
                  >
                    monthly-{formatDayWithOrdinal(Number(billDayOfMonth))}
                  </span>
                  {billStatus === "paid" ? (
                    <FaCheckCircle className="size-4 text-secondary-green" />
                  ) : billStatus === "due soon" ? (
                    <RiErrorWarningFill className="size-4 text-secondary-red"></RiErrorWarningFill>
                  ) : (
                    ""
                  )}
                </div>
              </TableCell>
              {billStatus === "due soon" ? (
                <TableCell>
                  <span className="text-present-4-bold text-secondary-red">
                    {dollars}
                  </span>
                </TableCell>
              ) : (
                <TableCell className="text-present-4-bold">{dollars}</TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default LargeBillsList;
