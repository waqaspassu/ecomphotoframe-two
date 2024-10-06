import { db } from "@/db";
import { notFound } from "next/navigation";
import CustomizeCase from "./CustomizeCase";

const Page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const configuration = await db.configuration.findFirst({
    where: {
      id: searchParams.id,
    },
  });

  if (!configuration) {
    return notFound();
  }

  return <CustomizeCase configuration={configuration} />;
};

export default Page;
