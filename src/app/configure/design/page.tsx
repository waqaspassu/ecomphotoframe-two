import FrameContainer from "@/components/FrameContainer";
import {
  notFound,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import React, { useState } from "react";
import CustomizeCase from "./CustomizeCase";
import { COLORSFRAME } from "@/lib/constant";
import { db } from "@/db";
import { getConfiguration } from "./action";

const page = async ({searchParams}:any) => {
  const configuration = await db.configuration.findFirst({
    where: {
      id: searchParams.id,
    },
  });

  console.log({ searchParams });

  if (!configuration) {
    return notFound();
  }

  return <CustomizeCase configuration={configuration} />;
};

export default page;
