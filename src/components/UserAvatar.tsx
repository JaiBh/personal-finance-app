"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";

function UserAvatar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return <>{mounted && <UserButton></UserButton>}</>;
}
export default UserAvatar;
