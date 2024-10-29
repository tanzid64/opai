"use client";
import { getWorkspaceFolders } from "@/actions/workspace";
import FolderDuotone from "@/components/icons/folder-duotone";
import { useMutationDataState } from "@/hooks/use-mutation-data";
import { useQueryData } from "@/hooks/use-query-data";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { FC } from "react";
import { Folder } from "./folder";

interface FoldersProps {
  workspaceId: string;
}

export type FoldersType = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workSpaceId: string | null;
  })[];
};

export const Folders: FC<FoldersProps> = ({ workspaceId }) => {
  // Get folders
  const { data, isFetched } = useQueryData(["workspace-folders"], () =>
    getWorkspaceFolders(workspaceId),
  );
  const { latestVariables } = useMutationDataState(["create-folder"]);
  // Optimistic variable
  const { data: folders, status } = data as FoldersType;

  if (isFetched && folders) {
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Folder section heading */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FolderDuotone />
          <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#BDBDBD]">See all</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      {/* Folder section content */}
      <section
        className={cn(
          "flex items-center gap-4 overflow-x-auto w-full",
          status !== 200 && "justify-center",
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folders in the workspace</p>
        ) : (
          <>
            {latestVariables && latestVariables.status === "pending" && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
                optimistic
              />
            )}
            {folders?.map((folder) => (
              <Folder
                key={folder.id}
                name={folder.name}
                id={folder.id}
                count={folder._count.videos}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};
