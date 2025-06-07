import TransactionsForm from "./TransactionsForm";
import TransactionsList from "./TransactionsList";

function TransactionsPage() {
  return (
    <section className="section-center bg-white rounded-xl py-6 px-5 md:px-6 space-y-5 md:space-y-6">
      <TransactionsForm></TransactionsForm>
      <TransactionsList></TransactionsList>
    </section>
  );
}
export default TransactionsPage;
