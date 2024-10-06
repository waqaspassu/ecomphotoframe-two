// global.d.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Attach `cachedPrisma` to `globalThis`
  var cachedPrisma: PrismaClient | undefined;
}

export {};