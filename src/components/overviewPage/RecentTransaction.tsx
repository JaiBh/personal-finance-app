"use client";

import Image from "next/image";
import { Transaction } from "../../../utils/types";
import { convertDateToText } from "../../../utils/utils";
import { useGetTransactionUserById } from "@/features/transactionUsers/api/useGetTransactionUsersById";
import { useGetAvatarById } from "@/features/transactionUsers/api/useGetAvatar";
import FallbackAvatar from "@/features/transactionUsers/components/FallbackAvatar";

function RecentTransaction({ transaction }: { transaction: Transaction }) {
  const transactionDate = convertDateToText(
    new Date(transaction.transactionDate)
  );
  const transactionUser = useGetTransactionUserById(
    transaction.transactionUserId
  ).data;
  const { data: avatarUrl } = useGetAvatarById(
    transactionUser?.imageId || null
  );
  const dateText = `${transactionDate.day} ${transactionDate.month.slice(0, 3)} ${transactionDate.year}`;
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="user avatar"
            priority
            height={32}
            width={32}
            className="object-cover"
            unoptimized
          ></Image>
        ) : (
          <FallbackAvatar name={transaction.name}></FallbackAvatar>
        )}
        <h4 className="text-present-4-bold">{transaction.name}</h4>
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
