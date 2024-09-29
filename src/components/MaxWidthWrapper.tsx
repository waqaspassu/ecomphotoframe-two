import { cn } from "@/lib/utils";
import { HTMLProps, ReactElement } from "react";

type MaxWidthWrapperProps = {
  children: ReactElement;
};
const MaxWidthWrapper = ({
  children,
  className,
}: HTMLProps<MaxWidthWrapperProps>) => {
  return <div className={cn("xl:max-w-screen-xl flex flex-col m-auto", className)}>{children}</div>;
};

export default MaxWidthWrapper;
