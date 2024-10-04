"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import { getPaymentStatus } from "./action";
import Image from "next/image";

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
    <div className="flex w-full h-[40rem]">
      <div className=" basis-1/4">
        {orders &&
          orders.configuraiton &&
          orders.configuraiton.croppedImageUrl && (
            <Image
              className=""
              src={orders?.configuraiton.croppedImageUrl}
              alt="frame image"
              fill
            />
          )}
      </div>
      <div className="basis-3/4">Helo here is your order</div>
    </div>
  );
};

export default DesignThankyou;
