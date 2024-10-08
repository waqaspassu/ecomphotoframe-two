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
import { useUploadThing } from "@/lib/uploadthings";
import { cn } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ConfigurationTypeProps, saveConfig as _saveConfig } from "./action";


type ColorFrameType = {
  readonly title: "Red" | "Blue" | "Black"; // Using string literal types for title
  readonly color: "red" | "blue" | "green"; // Using string literal types for color
};

const CustomizeCase = ({ configuration }: { configuration: Configuration }) => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const caseRef = useRef<HTMLImageElement | null>(null);
  const [colorsFrame, setColorFrame] = useState(COLORSFRAME);
  const [selectedFrame, setSelectedFrame] = useState(COLORSFRAME[0]);
  const [selectedSize, setSelectedSize] = useState(FRAMESIZES[0]);
  const [selectedFinish, setSelectedFinsih] = useState(FINISHES[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[0]);
  const [dimentions, setDimentions] = useState({
    width: configuration.width / 4,
    height: configuration.height / 4,
  });

  const { mutate: saveConfig } = useMutation({
    mutationFn: async (args: ConfigurationTypeProps) => {
      Promise.all([_saveConfig(args), handleSave()]);
    },
    onSuccess: () => {
      toast("successfully updated your configuration");
      router.push(`/configure/summary?id=${configuration.id}`);
    },
    onError: () => {
      console.log(setColorFrame);
    },
  });

  const { startUpload } = useUploadThing("imageUploader");

  const [ordinate, setOrdinate] = useState({ x: 200, y: 400 });

  const handleChangeColorFrame = (frame: ColorFrameType) => {
    setSelectedFrame(frame as typeof selectedFrame);
  };

  const handleChangeSize = (size: typeof selectedSize) => {
    setSelectedSize(size);
  };

  const handleClickMaterial = (material: typeof selectedMaterial) => {
    setSelectedMaterial(material);
  };
  const handleFinishClick = (finish: typeof selectedFinish) => {
    setSelectedFinsih(finish);
  };

  const totalPrice = selectedFinish.price + selectedMaterial.price;

  const handleSave = async () => {
    // const canvas =
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = dimentions.width;
    canvas.height = dimentions.height;

    // set background color
    if (ctx) {
      ctx.fillStyle = selectedFrame.color;
      ctx.fillRect(0, 0, dimentions.width, dimentions.height);
    }

    const { left: caseLeft, top: caseTop } =
      caseRef.current!.getBoundingClientRect();

    const { left: containerLeft, top: containerTop } =
      containerRef.current!.getBoundingClientRect();

    const offsetX = caseLeft - containerLeft;
    const offsetY = caseTop - containerTop;

    const actualX = ordinate.x - offsetX;
    const actualY = ordinate.y - offsetY;

    const img = new Image();
    img.src = configuration.imgUrl as string;
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      const imageX = actualX;
      const imageY = actualY;
      const imageWidth = dimentions.width;
      const imageHeight = dimentions.height;

      ctx?.drawImage(img, imageX, imageY, imageWidth, imageHeight);
      const dataUrl = canvas.toDataURL();
      const base64Data = dataUrl.split(",")[1];
      const mimeType = dataUrl.split(",")[0].split(";")[0].split(":")[1];
      const blob = base64toblob(base64Data, mimeType);

      const file = new File([blob], "filename.png", {
        type: mimeType,
      });

      await startUpload([file], { configId: configuration.id });
    };
  };
  function base64toblob(base64: string, mimeType: string) {
    const byteString = atob(base64);
    const byteNumber = new Array(byteString.length);
    for (let i = 0; i <= byteString.length; i++) {
      byteNumber[i] = byteString.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumber);

    return new Blob([byteArray], { type: mimeType });
  }
  return (
    <div className="flex p-10">
      <FrameContainer
        seletedColor={selectedFrame}
        configuration={configuration}
        setDimentions={setDimentions}
        setOrdinate={setOrdinate}
        dimentions={dimentions}
        containerRef={containerRef}
        caseRef={caseRef}
      />
      <div className="grow-[1] mt-10 pl-5">
        <h2 className="text-2xl font-bold">Customize your case</h2>
        {/* Color */}
        <div className="mt-5">
          <h3>Color : {selectedFrame.title}</h3>
          <div className="flex">
            {colorsFrame.map((frame, index) => {
              return (
                <div
                  className={cn(
                    "border p-1 rounded-full  w-10 h-10 mr-2",
                    `border-${frame.color}`
                  )}
                  style={{ borderColor: frame.color }}
                  onClick={() => handleChangeColorFrame(frame as typeof selectedFrame)}
                  key={index}
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
                      onClick={() =>
                        handleChangeSize(frame as typeof selectedSize)
                      }
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
                onClick={() =>
                  handleClickMaterial(material as typeof selectedMaterial)
                }
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
                onClick={() =>
                  handleFinishClick(finish as typeof selectedFinish)
                }
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
          <Button
            onClick={() =>
              saveConfig({
                configId: configuration.id,
                sizes: selectedSize.value,
                materials: selectedMaterial.name,
                finishes: selectedFinish.name,
                color: selectedFrame.color,
              })
            }
          >
            Continue <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};


export default CustomizeCase;

