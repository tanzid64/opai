import { Spinner } from "@/components/global/loader/spinner";
import { FC } from "react";

const AuthLoading: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <Spinner />
    </div>
  );
};

export default AuthLoading;