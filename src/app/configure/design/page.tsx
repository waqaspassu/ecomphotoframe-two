import FrameContainer from "@/components/FrameContainer";
import { notFound, useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import CustomizeCase from "./CustomizeCase";
import { COLORSFRAME } from "@/lib/constant";
import { db } from "@/db";
import { getConfiguration } from "./action";

const page = async () => {
  const configuration = await db.configuration.findFirst({
    where: {
      id: "cm1q50th60000135leta0csfn",
    },
  });

  if(!configuration){
    return notFound()
  }

  

  return <CustomizeCase configuration={configuration} />;
};

export default page;
