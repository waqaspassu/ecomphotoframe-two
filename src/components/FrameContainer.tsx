import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useRef, useState } from "react";

import { Rnd } from "react-rnd";

type FrameContainerProps = {
  seletedColor: any;
};
const FrameContainer = ({ seletedColor, configuration }: any) => {
  console.log(configuration.imgUrl, "img url");
  const [dimentions, setDimentions] = useState({
    width: configuration.width / 4,
    height: configuration.height / 4,
  });

  const [ordinate, setOrdinate] = useState({ x: 200, y: 400 });
  const containerRef = useRef();
  return (
    <div
      ref={containerRef.current}
      className="mt-10 relative bg-green h-[60vh] border-4  border-zinc-400 grow-[2] border-dotted p-3"
    >
      <div
        className={cn(
          "relative  w-full h-full border-2 border-zinc-300 border-dotted"
        )}
        style={{ backgroundColor: seletedColor.color }}
      >
        <Rnd
          lockAspectRatio
          default={{
            width: dimentions.width,
            height: dimentions.height,
            x: 120,
            y: 100,
          }}
          onDragStop={(e: any, d: any) => {
            console.log("d", d);
            setOrdinate({ x: d.x, y: d.y });
          }}
          onResizeStop={(_, b, ref, ___, { x, y }) => {
            setDimentions({
              width: parseInt(ref.style.width.slice(0, 2)),
              height: parseInt(ref.style.height.slice(0, -2)),
            });

            setOrdinate({
              x,
              y,
            });
          }}
        >
          <Image alt="frame image" src={configuration.imgUrl} fill />
        </Rnd>
      </div>
    </div>
  );
};

export default FrameContainer;
