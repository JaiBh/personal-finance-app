import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export const category = v.union(
  v.literal("general"),
  v.literal("shopping"),
  v.literal("lifestyle"),
  v.literal("education"),
  v.literal("personal-care"),
  v.literal("transportation"),
  v.literal("dining-out"),
  v.literal("groceries"),
  v.literal("bills"),
  v.literal("entertainment")
);

export const theme = v.union(
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
);

export const senderOrRecipient = v.union(
  v.literal("sender"),
  v.literal("recipient")
);

export const schema = defineSchema({
  ...authTables,
  authAccounts: defineTable({
    emailVerified: v.optional(v.string()),
    phoneVerified: v.optional(v.string()),
    provider: v.string(),
    providerAccountId: v.string(),
    secret: v.optional(v.string()),
    userId: v.id("users"),
  })
    .index("providerAndAccountId", ["provider", "providerAccountId"])
    .index("userIdAndProvider", ["userId", "provider"])
    .index("by_user_id", ["userId"]),
  // Your other tables...
  userInfo: defineTable({
    userId: v.id("users"),
    balance: v.number(),
    transactionUserId: v.id("transactionUsers"),
  }).index("by_user_id", ["userId"]),
  transactions: defineTable({
    userId: v.id("users"),
    senderOrRecipient: senderOrRecipient,
    transactionUserId: v.id("transactionUsers"),
    amount: v.number(),
    category,
    name: v.string(),
    transactionDate: v.string(),
    recurringBill: v.boolean(),
    starter: v.optional(v.boolean()),
  })
    .index("by_user_id", ["userId"])
    .index("by_starter", ["starter"])
    .index("by_category_user_id", ["category", "userId"])
    .index("by_category_user_id_sendOrReceive", [
      "category",
      "userId",
      "senderOrRecipient",
    ]),
  bills: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    name: v.string(),
    billDayOfMonth: v.string(),
    transactionUserId: v.id("transactionUsers"),
    starter: v.optional(v.boolean()),
  })
    .index("by_user_id", ["userId"])
    .index("by_starter", ["starter"]),
  pots: defineTable({
    userId: v.id("users"),
    targetAmount: v.number(),
    amount: v.number(),
    name: v.string(),
    theme,
    starter: v.optional(v.boolean()),
  })
    .index("by_user_id", ["userId"])
    .index("by_starter", ["starter"]),
  budgets: defineTable({
    userId: v.id("users"),
    category,
    maxSpend: v.number(),
    theme,
    starter: v.optional(v.boolean()),
  })
    .index("by_user_id", ["userId"])
    .index("by_starter", ["starter"]),
  transactionUsers: defineTable({
    name: v.string(),
    category,
    imageId: v.union(v.id("_storage"), v.null()),
    userId: v.optional(v.id("users")),
  }).index("by_user_id", ["userId"]),
});

export default schema;
