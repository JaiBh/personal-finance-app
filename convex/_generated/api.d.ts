/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as bills from "../bills.js";
import type * as budgets from "../budgets.js";
import type * as http from "../http.js";
import type * as pots from "../pots.js";
import type * as transactions from "../transactions.js";
import type * as transactionUsers from "../transactionUsers.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  bills: typeof bills;
  budgets: typeof budgets;
  http: typeof http;
  pots: typeof pots;
  transactions: typeof transactions;
  transactionUsers: typeof transactionUsers;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
