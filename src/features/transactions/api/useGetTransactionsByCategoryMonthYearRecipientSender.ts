import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Category, SenderOrRecipient } from "../../../../utils/types";

export const useGetTransactionsByCategoryMonthYearRecipientSender = ({
  category,
  senderOrRecipient,
}: {
  category: Category;
  senderOrRecipient: SenderOrRecipient;
}) => {
  // live application would have new Date()
  const yearMonth = "2024-08";

  const data = useQuery(
    api.transactions.getByCategoryMonthYearSenderRecipient,
    {
      category,
      yearMonth,
      senderOrRecipient,
    }
  );
  const isLoading = data === undefined;
  return { data, isLoading };
};
