"use client";

import Image from "next/image";
import { Transaction } from "../../../utils/types";
import avatar from "@/assets/sebastian-cook.svg";
import { convertDateToText } from "../../../utils/utils";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function RecentTransaction({ transaction }: { transaction: Transaction }) {
  if (!transaction) {
    return;
  }
  const transactionUserName = useQuery(api.transactionUsers.getById, {
    transactionId: transaction.transactionUserId,
  })?.name;
  const transactionDate = convertDateToText(
    new Date(transaction.transactionDate)
  );
  const dateText = `${transactionDate.day} ${transactionDate.month.slice(0, 3)} ${transactionDate.year}`;
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt="user avatar"
          priority
          height={32}
          width={32}
          className="object cover"
        ></Image>
        <h4 className="text-present-4-bold">{transactionUserName}</h4>
      </div>
      <div className="flex flex-col justify-items-end gap-2">
        <h4
          className={`text-present-4-bold ${transaction.senderOrRecipient === "recipient" && "text-secondary-green"}`}
        >
          {transaction.senderOrRecipient === "recipient" ? "+" : "-"}$
          {(transaction.amount / 100).toFixed(2)}
        </h4>
        <p className="text-present-5">{dateText}</p>
      </div>
    </li>
  );
}
export default RecentTransaction;
