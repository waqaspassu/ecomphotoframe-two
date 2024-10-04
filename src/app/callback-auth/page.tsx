"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import LoginModal from "@/components/Login";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [configId, setConfigId] = useState(
    localStorage.getItem("configurationId")
  );

  if (configId) {
    router.push(`/configure/summary?id=${configId}`);
  } else {
    router.push("/");
  }

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

export default page;
