import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { category } from "./schema";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.query("transactionUsers").collect();
  },
});
export const getById = query({
  args: { transactionId: v.id("transactionUsers") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.get(args.transactionId);
  },
});

export const getByUserId = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db
      .query("transactionUsers")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();
  },
});

export const create = mutation({
  args: {
    category: category,
    imageId: v.union(v.id("_storage"), v.null()),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const { category, imageId, name } = args;

    const transactionUserId = await ctx.db.insert("transactionUsers", {
      userId,
      name,
      imageId,
      category,
    });
    return {
      transactionUserId,
    };
  },
});

export const remove = mutation({
  args: { id: v.id("transactionUsers") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
    return { transactionUserId: args.id };
  },
});
