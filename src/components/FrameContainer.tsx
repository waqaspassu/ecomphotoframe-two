import { cn } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import Image from "next/image";

import { Rnd } from "react-rnd";

type FrameContainerProps = {
  seletedColor: {
    readonly title: "Red" | "Green" | "Blue";
    readonly color: "red" | "green" | "blue";
  };
  configuration: Configuration;
  setDimentions: (dimensions: { width: number; height: number }) => void;
  setOrdinate: (ordinate: { x: number; y: number }) => void;
  dimentions: {
    width: number;
    height: number;
  };
  containerRef: React.RefObject<HTMLDivElement>;
  caseRef: React.MutableRefObject<HTMLImageElement | null>;
};
const FrameContainer = ({
  seletedColor,
  configuration,
  setDimentions,
  setOrdinate,
  dimentions,
  containerRef,
  caseRef,
}: FrameContainerProps) => {
  return (
    <div
      ref={containerRef}
      className="mt-10 relative bg-green h-[60vh] border-4  border-zinc-400 grow-[2] border-dotted p-3"
    >
      <div
        className={cn(
          "relative  w-full h-full border-2 border-zinc-300 border-dotted "
        )}
        style={{ backgroundColor: seletedColor.color }}
      >
        <Rnd
          className="absolute z-20 border-[3px] border-primary"
          lockAspectRatio
          default={{
            width: dimentions.width,
            height: dimentions.height,
            x: 150,
            y: 100,
          }}
          onDragStop={(_, d) => {
            setOrdinate({ x: d.x, y: d.y });
          }}
          onResizeStop={(_, b, ref, ___, { x, y }) => {
            setDimentions({
              width: parseInt(ref.style.width.slice(0, -2)),
              height: parseInt(ref.style.height.slice(0, -2)),
            });

            setOrdinate({
              x,
              y,
            });
          }}
        >
          <Image
            ref={caseRef}
            alt="frame image"
            src={configuration.imgUrl ?? ""}
            fill
          />
        </Rnd>
      </div>
    </div>
  );
};

export default FrameContainer;
