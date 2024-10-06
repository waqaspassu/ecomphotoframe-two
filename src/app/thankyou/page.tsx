import { Suspense } from "react";
import DesignThankyou from "./DesignThankyou";

const page = async () => {
  return (
    <div className="w-full">
      <Suspense fallback={<div>Loading...</div>}>
      <DesignThankyou />
      </Suspense>
    </div>
  );
};

export default page;
