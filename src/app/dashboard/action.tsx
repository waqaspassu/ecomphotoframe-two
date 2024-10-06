"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OrderStatus } from "@prisma/client";

export const gettingOrder = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  const order = await db.order.findFirst({
    where: {
      id: user.id,
    },
  });

  return {
    order,
  };
};

export const updatingOrder = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) => {
  await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: status,
    },
  });
};
