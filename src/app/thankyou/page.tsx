import { db } from "@/db";
import React from "react";
import DesignThankyou from "./DesignThankyou";

const page = async ({ searchParams }: { searchParams: string }) => {
  return (
    <div className="w-full">
      <DesignThankyou />
    </div>
  );
};

export default page;
