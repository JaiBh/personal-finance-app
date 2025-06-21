"use client";

import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { isDemoUser } from "@/lib/auth/isDemoUser";
import { LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";

function UserAvatar() {
  const [mounted, setMounted] = useState(false);
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();

  useEffect(() => setMounted(true), []);

  if (!mounted || !isLoaded || !user) return null;

  return (
    <div className="max-sm:fixed top-4 right-4">
      {isDemoUser(user.id) ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="rounded-[50%] size-10 flex items-center justify-center text-white bg-destructive"
              onClick={() => signOut()}
            >
              <LogOut size={20}></LogOut>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sign out of demo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <UserButton></UserButton>
      )}
    </div>
  );
}
export default UserAvatar;
