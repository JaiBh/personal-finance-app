import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("transactionUsers").collect();
  },
});
export const getById = query({
  args: { transactionId: v.id("transactionUsers") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.transactionId);
  },
});
