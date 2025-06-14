"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCreatePotModal } from "@/features/pots/store/useCreatePotModal";
import { Pot } from "@/generated/prisma";
import { themeOptions } from "../../../utils/utils";
import { Button } from "../ui/button";
import { ClientPot } from "../../../utils/types";

interface AddPotButtonProps {
  pots: ClientPot[];
}

function AddPotButton({ pots }: AddPotButtonProps) {
  const [modal, setModal] = useCreatePotModal();
  const limitReached = pots?.length === themeOptions.length;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setModal({ ...modal, open: true, pots })}
            disabled={limitReached}
          >
            {limitReached ? "Pots Limit Reached" : "+ Add New Pot"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {limitReached ? (
            <p>You've reached your limit of pots</p>
          ) : (
            <p>Create a new pot</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
export default AddPotButton;
