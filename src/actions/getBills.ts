import { Bill, TransactionUser } from "@/generated/prisma";
import qs from "query-string";

interface Query {
  sortBy?: string;
  searchTerm?: string;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/bills`;
const getBills = async (
  query: Query
): Promise<(Bill & { transactionUser: TransactionUser })[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      sortBy: query.sortBy,
      searchTerm: query.searchTerm,
    },
  });
  const resp = await fetch(`${url}`);
  return resp.json();
};

export default getBills;
