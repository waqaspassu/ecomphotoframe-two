import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ConfigurationTypeProps } from "../design/action";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FINISHES, MATERIALS } from "@/lib/constant";
import { formatPrice } from "@/lib/utils";

const Summary = ({ configuration }: { configuration: any }) => {
  const finishes =
    FINISHES.find((finish) => finish.name === configuration.finishes)?.price ??
    0;

  const material =
    MATERIALS.find((material) => material.name === configuration.materials)
      ?.price ?? 0;

  return (
    <div className="flex mt-10 gap-5">
      <div>
        <Image
          src={configuration.croppedImageUrl}
          width={configuration.width / 4}
          height={configuration.height / 4}
          alt="your frame image"
        />
      </div>
      <div className="pl-5">
        <h2 className="text-3xl font-bold">Your {configuration.sizes} frame</h2>
        <div className="flex  items-center mt-2">
          <Check className="text-green-700 w-5 h-5 " />
          <p className="text-muted-foreground">In stock are ready to ship</p>
        </div>
        <div className="flex justify-between gap-10 mt-10">
          <div>
            <h2 className="text-xl">Highlights</h2>
            <ol className="list-disc">
              <li className="text-muted-foreground">
                Packing made from recycling materials
              </li>
              <li className="text-muted-foreground">
                We are here to listen any query
              </li>
              <li className="text-muted-foreground">
                Packing made from recycling materials
              </li>
            </ol>
          </div>
          <div>
            <h2 className="text-xl">Materials</h2>
            <ol className="list-disc">
              <li className="text-muted-foreground">
                We are using quality materials
              </li>
              <li className="text-muted-foreground">
                We are using pure raw gold and dimond for cotting
              </li>
            </ol>
          </div>
        </div>
        <div className="border-b border-zinc-200 my-10"></div>
        <div className="flex justify-between">
          <p>Base Price</p>
          <p>{formatPrice(material + finishes)}</p>
        </div>
        <div className="border-b border-zinc-200 my-10"></div>
        <div className="flex justify-between">
          <p>Total Price</p>
          <p>{formatPrice(material + finishes)}</p>
        </div>
        <div className="mt-14 flex justify-end">
          <Button className="">
            Checkout <ArrowRight className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
