import Image from "next/image";
import { Transaction } from "../../../utils/types";
import { TableCell, TableRow } from "../ui/table";
import FallbackAvatar from "@/features/transactionUsers/components/FallbackAvatar";
import { convertDateToText } from "../../../utils/utils";
import { useGetAvatarById } from "@/features/transactionUsers/api/useGetAvatar";
import { useGetTransactionUserById } from "@/features/transactionUsers/api/useGetTransactionUsersById";

function MobileListRow({ transaction }: { transaction: Transaction }) {
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
      <TableCell className="flex items-center gap-3">
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
        <div className="space-y-1">
          <h4 className="text-present-4-bold">{name}</h4>
          <p className="text-present-5 text-grey-500 capitalize">
            {category.replace("-", " ")}
          </p>
        </div>
      </TableCell>
      <TableCell className="text-right">
        {senderOrRecipient === "recipient" ? (
          <h4 className="text-present-4-bold text-secondary-green">
            +{dollars}
          </h4>
        ) : (
          <h4 className="text-present-4-bold">-{dollars}</h4>
        )}
        <p className="text-present-5 text-grey-500">
          {" "}
          {`${day} ${month} ${year}`}
        </p>
      </TableCell>
    </TableRow>
  );
}
export default MobileListRow;
