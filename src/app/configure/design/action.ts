"use server";

import { db } from "@/db";

export const getConfiguration = async (configId: string) => {
  const result = await db.configuration.findFirst({
    where: {
      id: configId,
    },
  });

  return {
    result,
  };
};
