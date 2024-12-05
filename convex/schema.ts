import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const schema = defineSchema({
  ...authTables,
  // Your other tables...
  transactions: defineTable({
    userId: v.id("users"),
    senderOrRecipient: v.union(v.literal("sender"), v.literal("recipient")),
    transactionUserId: v.id("transactionUsers"),
    amount: v.number(),
    transactionDate: v.string(),
    recurringBill: v.boolean(),
  }),
  bills: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    billDayOfMonth: v.string(),
    transactionUserId: v.id("transactionUsers"),
  }),
  pots: defineTable({
    userId: v.id("users"),
    targetAmount: v.number(),
    amount: v.number(),
    name: v.string(),
    theme: v.union(
      v.literal("green"),
      v.literal("yellow"),
      v.literal("cyan"),
      v.literal("navy"),
      v.literal("red"),
      v.literal("purple"),
      v.literal("turquoise"),
      v.literal("brown"),
      v.literal("magenta"),
      v.literal("blue"),
      v.literal("grey"),
      v.literal("army"),
      v.literal("pink"),
      v.literal("gold"),
      v.literal("orange")
    ),
  }),
  budgets: defineTable({
    userId: v.id("users"),
    category: v.union(
      v.literal("general"),
      v.literal("shopping"),
      v.literal("lifestyle"),
      v.literal("education"),
      v.literal("personal care"),
      v.literal("transportation"),
      v.literal("dining out"),
      v.literal("groceries"),
      v.literal("bills"),
      v.literal("entertainment")
    ),
    maxSpend: v.number(),
    theme: v.union(
      v.literal("green"),
      v.literal("yellow"),
      v.literal("cyan"),
      v.literal("navy"),
      v.literal("red"),
      v.literal("purple"),
      v.literal("turquoise"),
      v.literal("brown"),
      v.literal("magenta"),
      v.literal("blue"),
      v.literal("grey"),
      v.literal("army"),
      v.literal("pink"),
      v.literal("gold"),
      v.literal("orange")
    ),
  }),
  transactionUsers: defineTable({
    name: v.string(),
    category: v.union(
      v.literal("general"),
      v.literal("shopping"),
      v.literal("lifestyle"),
      v.literal("education"),
      v.literal("personal care"),
      v.literal("transportation"),
      v.literal("dining out"),
      v.literal("groceries"),
      v.literal("bills"),
      v.literal("entertainment")
    ),
    imageId: v.string(),
  }),
});

export default schema;
