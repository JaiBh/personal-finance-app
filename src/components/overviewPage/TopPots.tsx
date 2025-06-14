import { Pot } from "@/generated/prisma";

function TopPots({ topPots }: { topPots: Pot[] | undefined }) {
  if (!topPots || !topPots?.length) {
    return (
      <div className="p-4 flex items-center justify-center">
        <h3 className="text-present-4">No pots to display...</h3>
      </div>
    );
  }
  return (
    <ul className="grid gap-y-4 grid-cols-2">
      {topPots?.map((pot) => {
        return (
          <li
            key={pot.id}
            className="pl-4 truncate mr-1"
            style={{ borderLeft: `4px solid hsl(var(--clr-${pot.theme}))` }}
          >
            <span className="text-present-5 text-grey-500 capitalize">
              {pot.name}
            </span>
            <h4 className="text-present-4-bold mt-[3px]">
              ${(Number(pot.amount) / 100).toFixed(2)}
            </h4>
          </li>
        );
      })}
    </ul>
  );
}
export default TopPots;
