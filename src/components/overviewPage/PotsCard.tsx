"use client";

import { MdSavings } from "react-icons/md";
import TopPots from "./TopPots";
import OverviewCardHeader from "./OverviewCardHeader";
import Spinner from "../Spinner";
import { useGetPots } from "@/features/pots/api/useGetPots";

function PotsCard() {
  const { data: pots, isLoading } = useGetPots();
  const topPots =
    pots
      ?.sort((a, b) => {
        return b.amount - a.amount;
      })
      .slice(0, 4) || undefined;
  return (
    <article className="bg-card pb-6 pt-4 px-5 rounded-xl space-y-6">
      <OverviewCardHeader
        title={"Pots"}
        btnText={"See Details"}
        href={"/pots"}
      ></OverviewCardHeader>
      {isLoading ? (
        <div className="2xl:h-full">
          <Spinner></Spinner>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[5fr,_5fr] md:gap-5">
          <div className="bg-background py-5 px-4 flex items-center gap-4">
            <MdSavings className="w-10 h-10 text-secondary-green"></MdSavings>
            <div className="flex flex-col gap-3">
              <h4 className="text-present-4 text-grey-500">Total Saved</h4>
              <h1 className="text-present-1">
                $
                {(
                  (pots?.reduce((acc, curr) => acc + curr.amount, 0) || 0) / 100
                ).toFixed(2)}
              </h1>
            </div>
          </div>
          <TopPots topPots={topPots}></TopPots>
        </div>
      )}
    </article>
  );
}
export default PotsCard;
