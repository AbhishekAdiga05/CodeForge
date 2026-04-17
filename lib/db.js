import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Required for Node.js environment - provides WebSocket for Neon
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis;

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  // Pass config object directly to PrismaNeon factory (not a Pool instance)
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

function getDb() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// Use Proxy for lazy initialization
export const db = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getDb();
      const value = client[prop];
      return typeof value === "function" ? value.bind(client) : value;
    },
  }
);