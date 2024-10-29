"use client";
import FolderPlusDuotine from "@/components/icons/folder-plus-duotone";
import { Button } from "@/components/ui/button";
import { useCreateFolders } from "@/hooks/use-create-folders";
import { FC } from "react";

interface CreateFoldersProps {
  workspaceId: string;
}

export const CreateFolders: FC<CreateFoldersProps> = ({ workspaceId }) => {
  const { onCreateNewFolder } = useCreateFolders(workspaceId);
  return (
    <Button
      className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl"
      onClick={onCreateNewFolder}
    >
      <FolderPlusDuotine />
      Create A folder
    </Button>
  );
};
