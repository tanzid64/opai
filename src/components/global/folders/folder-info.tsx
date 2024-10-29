"use client";
import { getFolderInfo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/use-query-data";
import { FolderProps } from "@/types/index.types";
import { FC } from "react";

interface FolderInfoProps {
  folderId: string;
}

export const FolderInfo: FC<FolderInfoProps> = ({ folderId }) => {
  const { data } = useQueryData(["folder-info"], () => getFolderInfo(folderId));
  const { data: folder } = data as FolderProps;
  return (
    <div className="flex items-center">
      <h2 className="text-[#BDBDBD] text-2xl">{folder?.name}</h2>
    </div>
  );
};
