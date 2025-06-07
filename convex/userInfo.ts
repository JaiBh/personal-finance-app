import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db
      .query("userInfo")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .order("desc")
      .unique();
  },
});

export const create = mutation({
  args: {
    balance: v.number(),
    transactionUserId: v.id("transactionUsers"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const { balance, transactionUserId } = args;

    const userInfoId = await ctx.db.insert("userInfo", {
      userId,
      balance,
      transactionUserId,
    });
    return {
      userInfoId,
    };
  },
});

export const remove = mutation({
  args: { id: v.id("userInfo") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
    return { userInfoId: args.id };
  },
});
