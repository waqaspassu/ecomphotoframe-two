import React from "react";
import Summary from "./Summary";
import { db } from "@/db";

const page = async ({ searchParams }: any) => {
  const configuration = await db.configuration.findFirst({
    where: {
      id: searchParams.id,
    },
  });

  console.log({ configuration },'test');
  return (
    <div className="p-10">
      <Summary configuration={configuration} />
    </div>
  );
};

export default page;
