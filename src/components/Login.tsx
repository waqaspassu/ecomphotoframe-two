import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type LoginModalProps = {
  isOpen: boolean;
};

const LoginModal = ({ isOpen }: LoginModalProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Please register yourself and Proceed with your order
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center mt-10">
          <h2 className="mb-2">If you already have an account?</h2>
          <Link
            href="/api/auth/login"
            className={buttonVariants({
              size: "lg",
            })}
          >
            Login
          </Link>
        </div>
        <div className="flex flex-col items-center mt-5">
          <h2 className="mb-2">If you have not an account?</h2>
          <Link
            href="/api/auth/register"
            className={buttonVariants({
              size: "lg",
            })}
          >
            Register
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
