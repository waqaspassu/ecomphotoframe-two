import { Check, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

const Testmonials = () => {
  return (
    <div className="xl:mt-16 mb-20">
      <h1 className="text-4xl text-center font-bold">
        What our <span className="text-primary">customer</span> Say
      </h1>

      <div className="flex mt-20">
        <div className="px-20">
          <div className="flex">
            <Star className="text-green-700" fill="green" />
            <Star className="text-green-700" fill="green" />
            <Star className="text-green-700" fill="green" />
            <Star className="text-green-700" fill="green" />
            <Star className="text-green-700" fill="green" />
          </div>
          <h2 className="text-lg mt-6">
            I have discovered this case image and I am their permenent client. I
            have found it very interesting.{" "} <br/>
            <span className="bg-primary text-slate-50 p-1">
              I recommend every user
            </span>{" "}
            to try it. It made my time and day good
          </h2>
          <div className="mt-6">
            <div className="flex mt-5">
              <div>
                <Image
                  className="relative rounded-full"
                  src="/users/user-1.png"
                  alt="user image"
                  width={40}
                  height={40}
                />
              </div>

              <div className="ml-3">
                <h3>Johnathan</h3>
                <div className="flex items-center">
                  <Check className="text-green-700 w-4 h-4 font-extrabold" />
                  <p className="ml-1">Verified Purches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid px-20">
          <div className="flex">
            <Star className="text-green-700" fill="green" />
            <Star className="text-green-700" fill="green" />
            <Star className="text-green-700" fill="green" />
            <Star className="text-green-700" fill="green" />
            <Star className="text-green-700" fill="green" />
          </div>
          <h2 className="text-lg mt-5">
            I have discovered this case image and I am their permenent client. I
            have found it very interesting.{" "} <br/> 
            <span className="bg-primary text-slate-100 p-1">
             I recommend every user
            </span>{" "}
            to try it. It made my time and day good
          </h2>
          <div>
            <div className="relative flex mt-6">
              <div className="h-full">
                <Image
                  className="relative rounded-full object-cover"
                  src="/users/user-3.png"
                  alt="user image"
                  width={40}
                  height={40}
                />
              </div>

              <div className="ml-3">
                <h3>Rahana</h3>
                <div className="flex items-center">
                  <Check className="text-green-700 w-4 h-4 font-extrabold" />
                  <p className="ml-1">Verified Purches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testmonials;
