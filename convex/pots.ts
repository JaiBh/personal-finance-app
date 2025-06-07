import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { theme } from "./schema";

export const getStarter = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("pots")
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
      .query("pots")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    target: v.number(),
    theme: theme,
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const potId = await ctx.db.insert("pots", {
      userId,
      name: args.name,
      targetAmount: args.target,
      theme: args.theme,
      amount: args.amount,
    });
    return { potId };
  },
});

export const edit = mutation({
  args: {
    target: v.number(),
    name: v.string(),
    theme,
    id: v.id("pots"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, {
      targetAmount: args.target,
      name: args.name,
      theme: args.theme,
    });
    return { potId: args.id };
  },
});

export const remove = mutation({
  args: { id: v.id("pots") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    await ctx.db.delete(args.id);
    return { potId: args.id };
  },
});

export const transfer = mutation({
  args: {
    id: v.id("pots"),
    change: v.number(),
    newAmount: v.number(),
    addOrWithdraw: v.union(v.literal("add"), v.literal("withdraw")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const { id, change, addOrWithdraw, newAmount } = args;
    const userInfo = await ctx.db
      .query("userInfo")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .unique();
    if (!userInfo) {
      throw new Error(
        "Oops, something went wrong with this pot transaction. Please try again later!"
      );
    }
    if (addOrWithdraw === "add") {
      if (change > userInfo.balance) {
        throw new Error(
          "Not enough funds to process this pot transaction. Please try again with a different amount."
        );
      }
    } else {
      const pot = await ctx.db
        .query("pots")
        .withIndex("by_id", (q) => q.eq("_id", id))
        .unique();
      if (!pot) {
        throw new Error(
          "Oops, something went wrong with this pot transaction. Please try again later!"
        );
      }
      if (change > pot.amount) {
        throw new Error(
          "Unable to withdraw funds that are greater then the total funds of a pot"
        );
      }
    }
    await ctx.db.patch(id, {
      amount: newAmount,
    });

    if (addOrWithdraw === "add") {
      await ctx.db.patch(userInfo._id, {
        balance: userInfo.balance - change,
      });
    } else {
      await ctx.db.patch(userInfo._id, {
        balance: userInfo.balance + change,
      });
    }
    return { potId: args.id };
  },
});

export const getById = query({
  args: { id: v.id("pots") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.get(args.id);
  },
});
