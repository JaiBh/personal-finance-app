import { Transaction, TransactionUser } from "@/generated/prisma";
import qs from "query-string";

interface Query {
  category?: string;
  sortBy?: string;
  searchTerm?: string;
  senderOrRecipient?: string;
  startDate?: Date;
  recurring?: boolean;
  endDate?: Date;
  paginate?: boolean;
  take?: number;
  cursor?: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/transactions`;
const getTransactions = async (
  query: Query
): Promise<{
  transactions: (Transaction & { transactionUser: TransactionUser })[];
  nextCursor: string;
}> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      category: query.category,
      sortBy: query.sortBy,
      searchTerm: query.searchTerm,
      senderOrRecipient: query.senderOrRecipient,
      recurring: query.recurring,
      startDate: query.startDate
        ? `${query.startDate.getFullYear()}-${
            query.startDate.getMonth() + 1
          }-${query.startDate.getDate()}`
        : undefined,
      endDate: query.endDate
        ? `${query.endDate.getFullYear()}-${
            query.endDate.getMonth() + 1
          }-${query.endDate.getDate()}`
        : undefined,

      paginate: query.paginate,
      take: query.take,
      cursor: query.cursor,
    },
  });
  const resp = await fetch(`${url}`);
  return resp.json();
};

export default getTransactions;
