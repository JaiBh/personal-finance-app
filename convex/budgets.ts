import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { category, theme } from "./schema";
import { v } from "convex/values";

export const getStarter = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("budgets")
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
      .query("budgets")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const getById = query({
  args: { budgetId: v.id("budgets") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.get(args.budgetId);
  },
});

export const create = mutation({
  args: {
    maxSpend: v.number(),
    category,
    theme: theme,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const budgetId = await ctx.db.insert("budgets", {
      userId,
      maxSpend: args.maxSpend,
      category: args.category,
      theme: args.theme,
    });
    return { budgetId };
  },
});

export const edit = mutation({
  args: {
    maxSpend: v.number(),
    category,
    theme,
    id: v.id("budgets"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, {
      maxSpend: args.maxSpend,
      category: args.category,
      theme: args.theme,
    });
    return { budgetId: args.id };
  },
});

export const remove = mutation({
  args: { id: v.id("budgets") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
    return { budgetId: args.id };
  },
});
