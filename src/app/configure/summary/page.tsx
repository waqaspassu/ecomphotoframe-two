import { db } from "@/db";
import Summary from "./Summary";

const page = async ({ searchParams }: { searchParams: { id: string } }) => {
  const configuration = await db.configuration.findFirst({
    where: {
      id: searchParams.id,
    },
  });

  return (
    <div className="p-10">
      {configuration && <Summary configuration={configuration} />}
    </div>
  );
};

export default page;
