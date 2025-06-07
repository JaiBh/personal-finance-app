"use client";

import { useEffect, useState } from "react";
import CreateBudgetModal from "./budgetsPage/CreateBudgetModal";
import EditBudgetModal from "./budgetsPage/EditBudgetModal";
import CreatePotModal from "./potsPage/CreatePotModal";
import EditPotModal from "./potsPage/EditPotModal";
import AddMoneyToPotModal from "./potsPage/AddMoneyToPotModal";
import WithdrawModal from "./potsPage/WithdrawModal";

function Modals() {
  // avoids hydration error by rendering modals after page render
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }
  return (
    <>
      <EditBudgetModal></EditBudgetModal>
      <CreateBudgetModal></CreateBudgetModal>
      <CreatePotModal></CreatePotModal>
      <EditPotModal></EditPotModal>
      <AddMoneyToPotModal></AddMoneyToPotModal>
      <WithdrawModal></WithdrawModal>
    </>
  );
}
export default Modals;
