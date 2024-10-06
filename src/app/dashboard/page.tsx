import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import DashboardDesign from "./DashboardDesign";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if(!user){
    return notFound();
  }
  if (!user.email && user.email !== process.env.ADMIN_EMAIL) {
    return notFound();
  }

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
  });

  return (
    <div className="w-full px-20">
      <DashboardDesign orders={orders} />
    </div>
  );
};

export default page;
