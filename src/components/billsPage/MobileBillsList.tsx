import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { formatDayWithOrdinal } from "../../../utils/utils";
import { FaCheckCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { categorizeBill } from "@/actions/categorizeBill";
import { Bill, TransactionUser } from "@/generated/prisma";

interface MobileBillsProps {
  bills: (Bill & { transactionUser: TransactionUser })[];
}

function MobileBillsList({ bills }: MobileBillsProps) {
  return (
    <Table className="md:hidden">
      <TableBody>
        {bills.map((bill) => {
          const { id, name, amount, billDayOfMonth } = bill;
          const dollars = `$${(Number(amount) / 100).toFixed(2)}`;
          const billStatus = categorizeBill(bill);

          return (
            <TableRow
              className="border-none flex justify-between items-end"
              key={id}
            >
              <TableCell className="flex items-center gap-3">
                <Image
                  src={bill.transactionUser.imageUrl}
                  alt="user avatar"
                  priority
                  height={32}
                  width={32}
                  className="object cover"
                ></Image>
                <div className="space-y-1">
                  <h4 className="text-present-4-bold">{name}</h4>
                  <div className="flex gap-2 items-center">
                    <span className="text-secondary-green capitalize">
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
export default MobileBillsList;
