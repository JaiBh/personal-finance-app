import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pot as PotType } from "../../../utils/types";
import { Ellipsis } from "lucide-react";
import { useConfirm } from "@/hooks/useConfirm";
import { useDeletePot } from "@/features/pots/api/useDeletePot";
import { toast } from "sonner";
import { useEditPotModal } from "@/features/pots/store/useEditPotModal";
import { Button } from "../ui/button";
import { useAddMoneyModal } from "@/features/pots/store/useAddMoneyModal";
import { useWithdrawModal } from "@/features/pots/store/useWithdrawModal";

function Pot({ pot }: { pot: PotType }) {
  const { mutate, isPending } = useDeletePot();
  const [_editModal, setEditModal] = useEditPotModal();
  const [_addMoneyModal, setAddMoneyModal] = useAddMoneyModal();
  const [_withdrawModal, setWithdrawModal] = useWithdrawModal();
  const { targetAmount, amount, _id: id, theme, name } = pot;

  const savedPercentage = ((amount / targetAmount) * 100).toFixed(2);

  const [ConfirmDialog, confirm] = useConfirm(
    `Delete '${name}'?`,
    "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
  );

  const deletePot = async () => {
    const ok = await confirm();

    if (!ok) {
      return;
    }
    mutate(
      {
        id: pot._id,
      },
      {
        onSuccess() {
          toast.success("Pot removed");
        },
        onError() {
          toast.error("Failed to remove pot");
        },
      }
    );
  };

  const editPot = () => {
    setEditModal({
      open: true,
      id,
    });
  };

  const addMoney = () => {
    setAddMoneyModal({
      open: true,
      id,
    });
  };

  const withdraw = () => {
    setWithdrawModal({
      open: true,
      id,
    });
  };
  return (
    <>
      <ConfirmDialog></ConfirmDialog>
      <article className="px-5 py-6 bg-card rounded-xl space-y-6">
        {/* TITLE */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="size-4 rounded-[50%]"
              style={{ backgroundColor: `hsl(var(--clr-${theme}))` }}
            ></div>
            <h2 className="text-present-2">{name}</h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none space-y-1" align="end">
              <DropdownMenuItem className="text-present-4" onClick={editPot}>
                Edit Pot
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-present-4 text-secondary-red focus:text-secondary-red"
                onClick={deletePot}
                disabled={isPending}
              >
                Delete Pot
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* POT INFO */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-present-4 text-grey-500">Total Saved</h4>
            <h1 className="text-present-1">${(amount / 100).toFixed(2)}</h1>
          </div>
          <div className="space-y-3">
            <div className="h-2 bg-background rounded">
              <div
                className="rounded h-full"
                style={{
                  backgroundColor: `hsl(var(--clr-${theme}))`,
                  width: `${savedPercentage}%`,
                }}
              ></div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-present-5-bold text-grey-500">
                {savedPercentage}%
              </p>
              <p className="text-present-5 text-grey-500">
                Target of ${(targetAmount / 100).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* POT FOOTER */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={"secondary"}
            onClick={addMoney}
            disabled={amount === targetAmount}
          >
            <span className="text-present-4-bold">+ Add Money</span>
          </Button>
          <Button
            variant={"secondary"}
            disabled={amount === 0}
            onClick={withdraw}
          >
            <span className="text-present-4-bold">Withdraw</span>
          </Button>
        </div>
      </article>
    </>
  );
}
export default Pot;
