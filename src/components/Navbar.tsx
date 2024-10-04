import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const ADMIN_EMAIL = "waqasquba@gmail.com";



  return (
    <div className="relative">
      <MaxWidthWrapper className="relative">
        <nav className="fixed top-0 z-10 flex bg-slate-100 justify-between items-center p-4 left-0 right-0  shadow-sm">
          <div className="text-primary font-bold text-xl">Quba Frame</div>
          <ul className="flex items-center">
            <div className="pr-4">
              <Link className="hover:text-primary" href="/">
                Home
              </Link>
            </div>
            {user && user.email === ADMIN_EMAIL && (
              <div className="pr-4">
                <Link className="hover:text-primary" href="/">
                  Dashboard
                </Link>
              </div>
            )}

            <div className="pr-4">
              {!user ? (
                <Link href="/api/auth/login" className={buttonVariants()}>
                  Login
                </Link>
              ) : (
                <Link href="/api/auth/logout" className={buttonVariants()}>
                  Logout
                </Link>
              )}
            </div>
            <div className="pr-2">
              {!user && (
                <Link href="/api/auth/register" className={buttonVariants()}>
                  Register
                </Link>
              )}
            </div>
            <div>
              <Link className={buttonVariants()} href="/configure/upload">
                Create Frame <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            </div>
          </ul>
        </nav>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
