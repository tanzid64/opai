import { Spinner } from "@/components/global/loader/spinner";
import { FC } from "react";

export const AuthLoading: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center w-full">
      <Spinner />
    </div>
  );
};
