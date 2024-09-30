import Image from "next/image";
import React from "react";

const Slider = () => {
  return (
    <div className="relative flex justify-between h-[70vh] backdrop-blur-3xl">
      <div className=" absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
        <h1 className="text-5xl font-bold text-center">
          Make your <br /> <span className="text-primary"> own Cover</span> for{" "}
          <span className="text-primary">free</span>
        </h1>
      </div>
      <div className="w-full col-span-1">
        <div className="relative w-full h-full backdrop-blur-3xl">
          <Image
            className="relative object-cover"
            src="/1.jpg"
            fill
            alt="some image"
          />
        </div>
      </div>
      <div className="relative w-full col-span-1 backdrop-blur-3xl">
        <Image
          className="relative object-cover backdrop-blur-3xl"
          src="/2.jpg"
          fill
          alt="cover image"
        />
      </div>
    </div>
  );
};

export default Slider;
