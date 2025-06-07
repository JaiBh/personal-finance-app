import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { formatDayWithOrdinal } from "../../../utils/utils";
import avatar from "@/assets/sebastian-cook.svg";
import { Bill } from "../../../utils/types";
import { FaCheckCircle } from "react-icons/fa";
import { RiErrorWarningFill } from "react-icons/ri";

interface MobileBillsProps {
  bills: Bill[];
}

function MobileBillsList({ bills }: MobileBillsProps) {
  return (
    <Table className="md:hidden">
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
            <TableRow
              className="border-none flex justify-between items-end"
              key={_id}
            >
              <TableCell className="flex items-center gap-3">
                <Image
                  src={avatar}
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
export default MobileBillsList;
