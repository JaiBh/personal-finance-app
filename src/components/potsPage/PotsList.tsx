import { useGetPots } from "@/features/pots/api/useGetPots";
import Pot from "./Pot";
import { useCreatePotModal } from "@/features/pots/store/useCreatePotModal";
import { useEffect } from "react";
import Spinner from "../Spinner";

function PotsList() {
  const { data: pots, isLoading } = useGetPots();

  const [_modal, setModal] = useCreatePotModal();

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (!pots || pots?.length < 1) {
      setModal({
        open: true,
        isForced: true,
        altText: "add first pot",
      });
    }
  }, [isLoading, pots, setModal]);

  if (isLoading) {
    return (
      <div className="section-center grid gap-6 lg:grid-cols-2">
        <article className="h-[17rem] bg-card rounded-xl">
          <Spinner></Spinner>
        </article>
        <article className="h-[17rem] bg-card rounded-xl">
          <Spinner></Spinner>
        </article>
        <article className="h-[17rem] bg-card rounded-xl">
          <Spinner></Spinner>
        </article>
        <article className="h-[17rem] bg-card rounded-xl">
          <Spinner></Spinner>
        </article>
      </div>
    );
  }

  if (!pots?.length || !pots) {
    return;
  }

  return (
    <section className="section-center grid gap-6 lg:grid-cols-2">
      {pots.map((pot) => (
        <Pot pot={pot} key={pot._id}></Pot>
      ))}
    </section>
  );
}
export default PotsList;
