"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetPots } from "@/features/pots/api/useGetPots";
import { themeOptions } from "../../../../utils/utils";
import { Button } from "@/components/ui/button";
import { useCreatePotModal } from "@/features/pots/store/useCreatePotModal";
import PotsList from "../../../components/potsPage/PotsList";

function page() {
  const { data: pots } = useGetPots();
  const [modal, setModal] = useCreatePotModal();
  const limitReached = pots?.length === themeOptions.length;
  return (
    <div className="pb-6 grid gap-6 lg:gap-8">
      <section className="section-center flex justify-between mt-6 items-center">
        <h1 className="text-present-1">Pots</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setModal({ ...modal, open: true })}
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
      </section>
      <PotsList></PotsList>
    </div>
  );
}
export default page;
