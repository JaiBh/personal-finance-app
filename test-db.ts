import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const result = await prisma.$queryRaw`SELECT NOW()`;
    console.log("✅ Connected to DB:", result);
  } catch (err) {
    console.error("❌ Could not connect to DB:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
