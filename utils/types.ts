import { DataModel } from "../convex/_generated/dataModel";

export type Pot = DataModel["pots"]["document"];
export type Transaction = DataModel["transactions"]["document"];
export type Budget = DataModel["budgets"]["document"];
export type Bill = DataModel["bills"]["document"];
export type TransactionUser = DataModel["transactionUsers"]["document"];
