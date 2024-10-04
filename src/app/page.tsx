"use client";

import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Slider from "@/components/Slider";
import Testmonials from "@/components/Testmonials";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      {/* Helo */}
      <MaxWidthWrapper>
        <section>
          <Slider />
        </section>
        <section className="bg-slate-100 p-6">
          <Testmonials />
        </section>
        <section>
          <div className="mt-20 mb-20">
            <h2 className="text-3xl font-bold text-center">
              Upload your <span className="text-primary">Photo</span> and get
              your own Case
            </h2>
            <div className="flex flex-row mt-20">
              <div className="relative bg-green-50 h-[50vh] w-full">
                <Image
                  fill
                  src="/users/user-3.png"
                  alt="upload image"
                  className="object-cover"
                />
              </div>
              <div className="w-full pl-10">
                <ul className="mt-20">
                  <div className="flex">
                    <Check className="text-green-500" />
                    <li className="ml-1 text-lg">High quality frame cover </li>
                  </div>
                  <div className="flex">
                    <Check className="text-green-500" />
                    <li className="ml-1 text-lg">
                      High quality resoltution pictures{" "}
                    </li>
                  </div>
                  <div className="flex">
                    <Check className="text-green-500" />
                    <li className="ml-1 text-lg">
                      Best cover with gold cotting{" "}
                    </li>
                  </div>
                  <div className="flex">
                    <Check className="text-green-500" />
                    <li className="ml-1 text-lg">Effective designs </li>
                  </div>
                </ul>
                <Button
                  onClick={() => router.push("/configure/upload")}
                  className="text-sm mt-20"
                >
                  Create a frame now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
      </MaxWidthWrapper>
    </div>
  );
}
