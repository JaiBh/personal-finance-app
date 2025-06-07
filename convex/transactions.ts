import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { category, senderOrRecipient } from "./schema";

export const getStarter = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("transactions")
      .withIndex("by_starter", (q) => q.eq("starter", true))
      .order("asc")
      .collect();
  },
});

export const get = query({
  args: {
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, { limit = 10, cursor }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const items = await ctx.db
      .query("transactions")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .order("desc")
      .paginate({
        numItems: limit,
        cursor: cursor ?? null,
      });
    return items;
  },
});

export const getById = query({
  args: { transactionId: v.id("transactions") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.get(args.transactionId);
  },
});

export const getByCategory = query({
  args: {
    category: category,
    limit: v.optional(v.number()),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, { category, cursor, limit = 10 }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db
      .query("transactions")
      .withIndex("by_category_user_id", (q) =>
        q.eq("category", category).eq("userId", userId)
      )
      .order("desc")
      .paginate({
        numItems: limit,
        cursor: cursor ?? null,
      });
  },
});

export const getByMonthYear = query({
  args: {
    yearMonth: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    let transactions = await ctx.db
      .query("transactions")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    transactions = transactions.filter((transaction) =>
      transaction.transactionDate
        .toLowerCase()
        .includes(args.yearMonth.toLowerCase())
    );

    return transactions;
  },
});

export const getByCategoryMonthYear = query({
  args: {
    category,
    yearMonth: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    let transactions = await ctx.db
      .query("transactions")
      .withIndex("by_category_user_id_sendOrReceive", (q) =>
        q.eq("category", args.category).eq("userId", userId)
      )
      .order("desc")
      .collect();
    transactions = transactions.filter((transaction) =>
      transaction.transactionDate
        .toLowerCase()
        .includes(args.yearMonth.toLowerCase())
    );

    return transactions;
  },
});

export const getByCategoryMonthYearSenderRecipient = query({
  args: {
    category,
    yearMonth: v.string(),
    senderOrRecipient,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    let transactions = await ctx.db
      .query("transactions")
      .withIndex("by_category_user_id_sendOrReceive", (q) =>
        q
          .eq("category", args.category)
          .eq("userId", userId)
          .eq("senderOrRecipient", args.senderOrRecipient)
      )
      .order("desc")
      .collect();
    transactions = transactions.filter((transaction) =>
      transaction.transactionDate
        .toLowerCase()
        .includes(args.yearMonth.toLowerCase())
    );

    return transactions;
  },
});

export const create = mutation({
  args: {
    amount: v.number(),
    category,
    name: v.string(),
    recurringBill: v.boolean(),
    senderOrRecipient,
    transactionDate: v.string(),
    transactionUserId: v.id("transactionUsers"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const transactionId = await ctx.db.insert("transactions", {
      userId,
      senderOrRecipient: args.senderOrRecipient,
      transactionUserId: args.transactionUserId,
      category: args.category,
      name: args.name,
      amount: args.amount,
      transactionDate: args.transactionDate,
      recurringBill: args.recurringBill,
    });
    return { transactionId };
  },
});

export const remove = mutation({
  args: { id: v.id("transactions") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
    return { transactionId: args.id };
  },
});
