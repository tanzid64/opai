import { FC } from "react";

interface SectionHeaderProps {
  children: React.ReactNode;
  title: string;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ children, title }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {children}
        <h2 className="text-[#BDBDBD] text-xl">{title}</h2>
      </div>
    </div>
  );
};
