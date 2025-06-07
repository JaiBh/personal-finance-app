"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAvatarById } from "@/features/transactionUsers/api/useGetAvatar";
import { useGetTransactionUserByUserId } from "@/features/transactionUsers/api/useGetTransactionUserByUserId";
import FallbackAvatar from "@/features/transactionUsers/components/FallbackAvatar";
import Image from "next/image";

function UserProfileDropdown() {
  const { data: transactionUser } = useGetTransactionUserByUserId();
  const { data: avatarUrl } = useGetAvatarById(
    transactionUser?.imageId || null
  );
  if (!transactionUser) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {avatarUrl ? (
          <Image
            priority
            height={32}
            width={32}
            alt="user avatar"
            className="object-cover"
            src={avatarUrl}
          ></Image>
        ) : (
          <FallbackAvatar name={transactionUser?.name}></FallbackAvatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Sign out</DropdownMenuItem>
        <DropdownMenuItem>Delete Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserProfileDropdown;
