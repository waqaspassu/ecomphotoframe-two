"use client";

import FrameContainer from "@/components/FrameContainer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COLORSFRAME, FINISHES, FRAMESIZES, MATERIALS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const CustomizeCase = ({ configuration }: any) => {
  const searchParams = useSearchParams();
  const params = searchParams.get("id");
  const [colorsFrame, setColorFrame] = useState<any>(COLORSFRAME);
  const [selectedFrame, setSelectedFrame] = useState(COLORSFRAME[0]);

  const [selectedSize, setSelectedSize] = useState(FRAMESIZES[0]);
  const [selectedFinish, setSelectedFinsih] = useState(FINISHES[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);

  console.log({ colorsFrame });

  const handleChangeColorFrame = (frame: any) => {
    setSelectedFrame(frame);
  };

  const handleChangeSize = (size: any) => {
    setSelectedSize(size);
  };

  const handleClickMaterial = (material: any) => {
    setSelectedMaterial(material);
  };
  const handleFinishClick = (finish: any) => {
    setSelectedFinsih(finish);
  };

  const totalPrice = selectedFinish.price + selectedMaterial.price;

  return (
    <div className="flex p-10">
      <FrameContainer
        seletedColor={selectedFrame}
        configuration={configuration}
      />
      <div className="grow-[1] mt-10 pl-5">
        <h2 className="text-2xl font-bold">Customize your case</h2>
        {/* Color */}
        <div className="mt-5">
          <h3>Color : {selectedFrame.title}</h3>
          <div className="flex">
            {colorsFrame.map((frame: typeof selectedFrame, index: number) => {
              return (
                <div
                  className={cn(
                    "border p-1 rounded-full  w-10 h-10 mr-2",
                    `border-${frame.color}`
                  )}
                  style={{ borderColor: frame.color }}
                  onClick={() => handleChangeColorFrame(frame)}
                  key={frame.color}
                >
                  <div
                    className={cn(
                      "mr-2 rounded-full cursor-pointer w-full h-full"
                    )}
                    style={
                      frame.color === selectedFrame.color
                        ? { backgroundColor: selectedFrame.color }
                        : {}
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-5">
          <h2>Sizes</h2>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-1/2 focus:outline-none bg-zinc-300">
                {selectedSize.title}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {FRAMESIZES.map((frame) => {
                  return (
                    <DropdownMenuItem
                      className="w-1/2"
                      onClick={() => handleChangeSize(frame)}
                      key={frame.value}
                    >
                      {frame.title}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-5">
          <h2>Materials</h2>

          {MATERIALS.map((material) => {
            return (
              <div
                onClick={() => handleClickMaterial(material)}
                key={material.name}
                className={cn(
                  "cursor-pointer flex p-4 border border-zinc-200 my-2 w-1/2 justify-between",
                  selectedMaterial.name === material.name
                    ? `border-primary`
                    : ""
                )}
              >
                <p className="text-md mr-1">{material.name}</p>
                <p className="text-muted-foreground">{material.description}</p>
                <p>{material.price}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5">
          <h2>Finishes</h2>
          {FINISHES.map((finish) => {
            return (
              <div
                key={finish.name}
                onClick={() => handleFinishClick(finish)}
                className={cn(
                  "flex p-5 border border-zinc-200 w-1/2 my-2 justify-between cursor-pointer",
                  finish.name === selectedFinish.name ? "border-primary" : ""
                )}
              >
                <p>{finish.name}</p>
                <p className="text-muted-foreground">{finish.description}</p>
                <p>{finish.price}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex w-1/2 justify-between items-center">
          <p>Total: {totalPrice}</p>
          <Button>
            Continue <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeCase;
