"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { MdSavings } from "react-icons/md";
import TopPots from "./TopPots";
import OverviewCardHeader from "./OverviewCardHeader";

function PotsCard() {
  const pots = useQuery(api.pots.get);
  const topPots =
    pots
      ?.sort((a, b) => {
        return b.amount - a.amount;
      })
      .slice(0, 4) || undefined;
  return (
    <article className="bg-card py-6 px-5 rounded-xl grid gap-6">
      <OverviewCardHeader
        title={"Pots"}
        btnText={"See Details"}
        href={"/pots"}
      ></OverviewCardHeader>
      <div className="grid gap-6 md:grid-cols-[4fr,_6fr] md:gap-5">
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
    </article>
  );
}
export default PotsCard;
