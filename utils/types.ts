import {
  Bill,
  Budget,
  Pot,
  Transaction,
  TransactionUser,
} from "@/generated/prisma";

export type SortBy = "latest" | "oldest" | "a-z" | "z-a" | "highest" | "lowest";

export type ClientTransaction = Omit<Transaction, "amount"> & {
  amount: number;
};

export type ClientPot = Omit<Pot, "amount" | "targetAmount"> & {
  amount: number;
  targetAmount: number;
};

export type ClientTransactionUser = Omit<TransactionUser, "balance"> & {
  balance: number | null;
};

export type ClientBudget = Omit<Budget, "maxSpend"> & {
  maxSpend: number;
};

export type ClientBill = Omit<Bill, "amount" | "billDayOfMonth"> & {
  amount: number;
  billDayOfMonth: number;
};

export type TimeFrameOptions =
  | "30-days"
  | "3-months"
  | "1-year"
  | "all-time"
  | "custom";
