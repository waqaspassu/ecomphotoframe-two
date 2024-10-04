"use server";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  const order = db.order.findFirst({
    where: {
      id: orderId,
      userId: user.id,
    },
    include: {
      bilingAddress: true,
      configuraiton: true,
      shippingAddress: true,
      User: true,
    },
  });

  if (!order) {
    throw new Error("the order does not exist");
  }

  return order;
};
