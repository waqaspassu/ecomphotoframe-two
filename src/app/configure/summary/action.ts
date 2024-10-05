"use server";
import { db } from "@/db";
import { FINISHES } from "@/lib/constant";
import { PRODUCT_PRICES } from "@/lib/prices";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order, OrderStatus } from "@prisma/client";

import { stripe } from "@/lib/stripe";

export const checkoutSession = async ({ configId }: { configId: string }) => {
  const configuration = await db.configuration.findUnique({
    where: {
      id: configId,
    },
  });

  if (!configuration) {
    throw new Error("No configuration found");
  }

  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("please login");
  }
  const existingUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!existingUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email!,
      },
    });
  }

  const { finishes, materials } = configuration;

  let price = 0;

  if (finishes === "plaintextured") {
    price += PRODUCT_PRICES.finishes.plaintextured;
  } else {
    price += PRODUCT_PRICES.finishes.smooth;
  }

  if (materials === "diamond") {
    price += PRODUCT_PRICES.materials.diamond;
  } else {
    price += PRODUCT_PRICES.materials.gold;
  }

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      id: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    console.log(user.id, "user id");

    order = await db.order.create({
      data: {
        amount: price,
        configurationId: configuration.id,
        isPaid: false,
        userId: user.id,
      },
    });
  }

  const products = await stripe.products.create({
    name: "Custom Image Frame",
    images: [configuration.imgUrl!],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.KINDE_SITE_URL}/thankyou?orderId=${order.id}`,
    cancel_url: `${process.env.KINDE_SITE_URL}/configure/summary?id=${configuration.id}`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["AC", "AF", "PK"],
    },
    billing_address_collection: "required",
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [
      {
        price: (await products).default_price as string,
        quantity: 1,
      },
    ],
  });

  return {
    url: stripeSession.url,
  };
};
