"use server";

import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import Stripe from "stripe";

import EmailTemplate from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const signiture = headers().get("stripe-signature");

    if (!signiture) {
      throw new Error("You do not have provided a signiture to our stripe");
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signiture,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      if (!event.data.object.customer_details?.email) {
        throw new Error("Customer email not found");
      }

      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, orderId } = event.data.object.metadata || {
        userId: null,
        orderId: null,
      };

      if (!userId || !orderId) {
        throw new Error("Invalid request metadata");
      }

      const shippingAddress = session.shipping_details?.address;
      const billingAddress = session.customer_details?.address;
      await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          shippingAddress: {
            create: {
              name: session.customer_details?.name!,
              city: shippingAddress?.city!,
              country: shippingAddress?.country!,
              postalCode: shippingAddress?.postal_code!,
              street: shippingAddress?.line1!,
              state: shippingAddress?.state,
            },
          },
          bilingAddress: {
            create: {
              name: session.customer_details?.name!,
              street: billingAddress?.line1!,
              city: billingAddress?.city!,
              postalCode: billingAddress?.postal_code!,
              courtry: billingAddress?.country!,
            },
          },
        },
      });
      if (session.customer_details?.email)
        await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: [session.customer_details?.email]!,
          subject: "Quba Frame",
          react: EmailTemplate(),
        });
    }
    return NextResponse.json({
      result: event,
      ok: true,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
