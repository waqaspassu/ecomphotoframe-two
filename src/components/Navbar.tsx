import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <MaxWidthWrapper>
        <nav className="bg-primary-foreground flex justify-between items-center px-2 py-2">
          <div className="text-primary font-bold text-xl">Quba Frame</div>
          <ul className="flex items-center">
            <div className="pr-4">
              <Link href="/">Home</Link>
            </div>
            <div className="pr-4">
              <Link href="/">Dashboard</Link>
            </div>
            <div className="pr-4">
              <Link href="/" className={buttonVariants({})}>
                Login
              </Link>
            </div>
            <div className="pr-2">
              <Link href="/" className={buttonVariants()}>
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
