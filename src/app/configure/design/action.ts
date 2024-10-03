"use server";

import { db } from "@/db";

import {
  ColorFrames,
  MaterialFrame,
  FinishesFrame,
  SizesCase,
} from "@prisma/client";

export type ConfigurationTypeProps = {
  configId: string;
  color: ColorFrames;
  sizes: SizesCase;
  materials: MaterialFrame;
  finishes: FinishesFrame;
};

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

export const saveConfig = async ({
  configId,
  color,
  sizes,
  materials,
  finishes,
}: ConfigurationTypeProps) => {
  const res = await db.configuration.update({
    where: {
      id: configId,
    },
    data: {
      sizes,
      materials,
      finishes,
      color,
    },
  });
};
