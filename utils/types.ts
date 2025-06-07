import { DataModel, Doc, Id } from "../convex/_generated/dataModel";

export type Pot = DataModel["pots"]["document"];
export type Transaction = Doc<"transactions">;
export type Budget = DataModel["budgets"]["document"];
export type Bill = DataModel["bills"]["document"];
export type UserInfo = DataModel["userInfo"]["document"];
export type TransactionUser = DataModel["transactionUsers"]["document"];
export type Category = Doc<"transactions">["category"];
export type Theme = Doc<"budgets">["theme"];
export type SenderOrRecipient = Doc<"transactions">["senderOrRecipient"];

export type SortBy = "latest" | "oldest" | "a-z" | "z-a" | "highest" | "lowest";
