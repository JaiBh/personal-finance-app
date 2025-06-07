import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import avatar from "@/assets/sebastian-cook.svg";
import { Bill } from "../../../utils/types";
import { FaCheckCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";
import { formatDayWithOrdinal } from "../../../utils/utils";

interface LargeBillsListProps {
  bills: Bill[];
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
          const { _id, name, amount, billDayOfMonth } = bill;
          const dollars = `$${(amount / 100).toFixed(2)}`;
          const today = new Date("2024-08-20").getDate();
          const paid = Number(billDayOfMonth) <= today;
          const dueSoon =
            Number(billDayOfMonth) - today <= 5 &&
            Number(billDayOfMonth) > today;
          return (
            <TableRow className="border-none" key={_id}>
              <TableCell className="flex items-center gap-4">
                <Image
                  src={avatar}
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
                  <span className="text-secondary-green capitalize">
                    monthly-{formatDayWithOrdinal(billDayOfMonth)}
                  </span>
                  {paid ? (
                    <FaCheckCircle className="size-4 text-secondary-green" />
                  ) : dueSoon ? (
                    <RiErrorWarningFill className="size-4 text-secondary-red"></RiErrorWarningFill>
                  ) : (
                    ""
                  )}
                </div>
              </TableCell>
              {dueSoon ? (
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
