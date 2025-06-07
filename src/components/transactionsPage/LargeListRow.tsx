import Image from "next/image";
import { Transaction } from "../../../utils/types";
import { TableCell, TableRow } from "../ui/table";
import FallbackAvatar from "@/features/transactionUsers/components/FallbackAvatar";
import { convertDateToText } from "../../../utils/utils";
import { useGetAvatarById } from "@/features/transactionUsers/api/useGetAvatar";
import { useGetTransactionUserById } from "@/features/transactionUsers/api/useGetTransactionUsersById";

function LargeListRow({ transaction }: { transaction: Transaction }) {
  const {
    name,
    category,
    transactionDate,
    amount,
    senderOrRecipient,
    transactionUserId,
  } = transaction;

  const transactionUser = useGetTransactionUserById(transactionUserId).data;
  const { data: avatarUrl } = useGetAvatarById(
    transactionUser?.imageId || null
  );

  const { day, month, year } = convertDateToText(new Date(transactionDate));
  const dollars = `$${(amount / 100).toFixed(2)}`;
  return (
    <TableRow className="border-none">
      <TableCell className="flex items-center gap-4">
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
          <FallbackAvatar name={name}></FallbackAvatar>
        )}
        <h4 className="text-present-4-bold">{name}</h4>
      </TableCell>
      <TableCell className="text-present-5 text-grey-500 capitalize">
        {category.replace("-", " ")}
      </TableCell>
      <TableCell className="text-present-5 text-grey-500">
        {`${day} ${month} ${year}`}
      </TableCell>
      {senderOrRecipient === "recipient" ? (
        <TableCell className="text-present-4-bold text-secondary-green">
          +{dollars}
        </TableCell>
      ) : (
        <TableCell className="text-present-4-bold">-{dollars}</TableCell>
      )}
    </TableRow>
  );
}
export default LargeListRow;
