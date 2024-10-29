"use client";
import { renameFolders } from "@/actions/workspace";
import FolderDuotone from "@/components/icons/folder-duotone";
import { Input } from "@/components/ui/input";
import {
  useMutationData,
  useMutationDataState,
} from "@/hooks/use-mutation-data";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FC, useRef, useState } from "react";
import { Loader } from "../loader";

interface FolderProps {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
}

export const Folder: FC<FolderProps> = ({ name, id, optimistic, count }) => {
  const pathName = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const [onRename, setOnRename] = useState<boolean>(false);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  // TODO: add loading state

  // Optimistic rename folder
  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    (data: { name: string }) => renameFolders(id, data.name),
    "workspace-folders",
    Renamed,
  );

  const { latestVariables } = useMutationDataState(["rename-folders"]);

  const handleFolderClick = () => {
    if (onRename) return;
    router.push(`${pathName}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        mutate({ name: inputRef.current.value, id });
      } else Renamed();
    }
  };

  return (
    <div
      onClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] p-4 rounded-lg border-[1px]",
        optimistic && "opacity-60",
      )}
    >
      <Loader state={false}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                updateFolderName(e);
              }}
              autoFocus
              placeholder={name}
              className="border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0"
              ref={inputRef}
            />
          ) : (
            <p
              onClick={(e) => e.stopPropagation()}
              className="text-neutral-300"
              onDoubleClick={handleNameDoubleClick}
            >
              {latestVariables &&
              latestVariables.status === "pending" &&
              latestVariables.variables.id === id
                ? latestVariables.variables.name
                : name}
            </p>
          )}

          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderDuotone />
    </div>
  );
};
