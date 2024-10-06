"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();

  const [configId, setConfigId] = useState<string | null>(null);

  if (configId) {
    router.push(`/configure/summary?id=${configId}`);
  } else {
    router.push("/");
  }

  useEffect(() => {
    const configurationId = localStorage.getItem("configurationId");
    setConfigId(configurationId);
  }, []);

  console.log(setConfigId);

  return (
    <div className="h-[35rem]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -tranlate-y-1/2 transform flex flex-col items-center">
        <h2 className="text-center text-muted-foreground">
          We are redirecting...
        </h2>
        <Loader2 className="animate-spin text-4xl w-10 h-10 text-primary" />
      </div>
    </div>
  );
};

export default Page;
