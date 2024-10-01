"use client"
import { STEPPER } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { useParams, usePathname, useSearchParams } from "next/navigation";

const Stepper = () => {
    const params = usePathname()
    console.log({params})
  return (
    <div>
      <div className="flex justify-center mt-10 ">
        {STEPPER.map((step, index) => {
          return (
            <div key={step.title} className={cn("flex border-b border-t border-r border-l border-zinc-200 p-10 mx-5",{
                "border-b-primary border-b-2":  params === step.url
            })}>
              <h1>{step.title}</h1>
              <p>{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
