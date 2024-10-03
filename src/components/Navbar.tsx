import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="sticky">
      <MaxWidthWrapper>
        <nav className="sticky bg-primary-foreground flex justify-between items-center px-2 py-2">
          <div className="text-primary font-bold text-xl">Quba Frame</div>
          <ul className="flex items-center">
            <div className="pr-4">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
            </div>
            <div className="pr-4">
              <Link className="hover:text-primary" href="/">
                Dashboard
              </Link>
            </div>
            <div className="pr-4">
              <Link href="/api/auth/login" className={buttonVariants()}>
                Login
              </Link>
            </div>
            <div className="pr-2">
              <Link href="/api/auth/register" className={buttonVariants()}>
                Register
              </Link>
            </div>
          </ul>
        </nav>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
