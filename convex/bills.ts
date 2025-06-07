import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getStarter = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("bills")
      .withIndex("by_starter", (q) => q.eq("starter", true))
      .collect();
  },
});

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db
      .query("bills")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    amount: v.number(),
    billDayOfMonth: v.string(),
    name: v.string(),
    transactionUserId: v.id("transactionUsers"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const { amount, billDayOfMonth, name, transactionUserId } = args;
    const billId = await ctx.db.insert("bills", {
      userId,
      amount,
      billDayOfMonth,
      name,
      transactionUserId,
    });
    return { billId };
  },
});

export const remove = mutation({
  args: { id: v.id("bills") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
    return { billId: args.id };
  },
});
