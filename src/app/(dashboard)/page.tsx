"use client";

import FirstTimeLogin from "@/features/fistTimeLogin/components/FirstTimeLogin";
import OverviewCards from "@/components/overviewPage/OverviewCards";
import SummaryCards from "@/components/overviewPage/SummaryCards";
import { useGetTransactionUserByUserId } from "@/features/transactionUsers/api/useGetTransactionUserByUserId";
import FullScreenLoading from "@/components/FullScreenLoading";

function page() {
  const { data, isLoading } = useGetTransactionUserByUserId();
  if (isLoading) return <FullScreenLoading></FullScreenLoading>;
  if (!data) {
    return <FirstTimeLogin></FirstTimeLogin>;
  }
  return (
    <div className="pb-6 grid gap-8 2xl:grid-rows-[auto,_auto,_1fr] min-h-screen">
      <section className="section-center">
        <h1 className="text-present-1 mt-6">Overview</h1>
      </section>
      <SummaryCards></SummaryCards>
      <OverviewCards></OverviewCards>
    </div>
  );
}
export default page;
