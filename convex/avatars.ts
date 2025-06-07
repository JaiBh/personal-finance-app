import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

export const getById = query({
  args: {
    storageId: v.union(v.id("_storage"), v.null()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }
    if (args.storageId) {
      return await ctx.storage.getUrl(args.storageId);
    } else return null;
  },
});

export const generateAndStore = action({
  args: { imageUrl: v.union(v.string(), v.null()) },
  handler: async (ctx, args) => {
    if (!args.imageUrl) {
      return;
    }

    // Download the image
    const response = await fetch(args.imageUrl);
    const image = await response.blob();

    // Store the image in Convex
    const storageId: Id<"_storage"> = await ctx.storage.store(image);
    return storageId;
  },
});

export const deleteById = mutation({
  args: {
    id: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.id);
    return { avatarId: args.id };
  },
});
