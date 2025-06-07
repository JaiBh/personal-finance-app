import TransactionsPage from "@/components/transactionsPage/TransactionsPage";

function page() {
  return (
    <div className="pb-6 grid gap-6 lg:gap-8 grid-rows-[auto,_1fr] min-h-screen">
      <section className="section-center">
        <h1 className="text-present-1 mt-6">Transactions</h1>
      </section>
      <TransactionsPage></TransactionsPage>
    </div>
  );
}
export default page;
