"use client";

import { useCreatePotModal } from "@/features/pots/store/useCreatePotModal";
import Pot from "./Pot";
import { ClientPot, ClientTransactionUser } from "../../../utils/types";

interface PotsListProps {
  pots: ClientPot[];
  transactionUser: ClientTransactionUser;
}

function PotsList({ pots, transactionUser }: PotsListProps) {
  const [_modal, setModal] = useCreatePotModal();

  if (!pots || pots?.length < 1) {
    setModal({
      open: true,
      isForced: true,
      altText: "add first pot",
      pots: [],
    });
  }

  if (!pots?.length || !pots) {
    return;
  }

  return (
    <section className="section-center grid gap-6 lg:grid-cols-2">
      {pots.map((pot) => (
        <Pot
          pot={pot}
          pots={pots}
          key={pot.id}
          transactionUser={transactionUser}
        ></Pot>
      ))}
    </section>
  );
}
export default PotsList;
