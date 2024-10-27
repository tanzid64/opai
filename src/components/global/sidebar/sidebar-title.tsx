import { cn } from "@/lib/utils";
import { FC } from "react";

interface SidebarTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SidebarTitle: FC<SidebarTitleProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("w-full text-[#9D9D9D] font-bold mt-4", className)}>
      {children}
    </p>
  );
};
