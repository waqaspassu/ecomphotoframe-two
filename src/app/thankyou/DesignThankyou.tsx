"use client";
import { formatPrice } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getPaymentStatus } from "./action";

const DesignThankyou = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data: orders } = useQuery({
    queryKey: ["getting-thankyou-key"],
    queryFn: async () =>
      await getPaymentStatus({
        orderId,
      }),
    retry: true,
    retryDelay: 500,
  });

  return (

    <div className="grid grid-cols-3 gap-6 my-10">
      <div className="relative col-span-1 pl-8">
        {orders &&
          orders.configuraiton &&
          orders.configuraiton.croppedImageUrl && (
            <div className="relative">
              <Image
                className="relative object-cover"
                src={orders?.configuraiton.croppedImageUrl}
                alt="frame image"
                width={orders.configuraiton.width}
                height={orders.configuraiton.height}
              />
            </div>
          )}
      </div>
      <div className="col-span-2 px-10">
        <h2 className="text-2xl font-bold">Thank you</h2>
        <p className="text-muted-foreground mb-4">Your case is on the way</p>
        <div className="flex">
          <p className="mr-3">Order id</p>
          <p className="text-muted-foreground">{orders?.id}</p>
        </div>
        <div>
          <div className="flex">
            <p>Delivery Address:</p>
            <address className="text-muted-foreground ml-3">
              {orders?.shippingAddress?.city} {orders?.shippingAddress?.street}
            </address>
          </div>
        </div>
        <div>
          <div className="border-b border-zinc-300 my-4" />
          <div className="flex justify-between">
            <p>Billing Cost</p>
            <p>{formatPrice(orders?.amount || 0)}</p>
          </div>
          <div className="border-b border-zinc-300 my-4" />
          <div className="flex justify-between">
            <p>Shipping Cost</p>
            <p>{formatPrice(orders?.amount || 0)}</p>
          </div>
          <div className="border-b border-zinc-300 my-4" />

          <div className="flex justify-between">
            <p>Total Cost</p>
            <p>{formatPrice(orders?.amount || 0)}</p>
          </div>
        </div>
        {/* {
          JSON.stringify(orders, null,2)
        } */}
      </div>
    </div>
  );
};

export default DesignThankyou;
