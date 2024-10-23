import { cn } from "@/lib/utils";
import { FC } from "react";
import { Spinner } from "./spinner";

interface LoaderProps {
  state: boolean;
  className?: string;
  color?: string;
  children?: React.ReactNode;
}

export const Loader: FC<LoaderProps> = ({
  state,
  className,
  color,
  children,
}) => {
  return state ? (
    <div className={cn(className)}>
      <Spinner />
    </div>
  ) : (
    children
  );
};
