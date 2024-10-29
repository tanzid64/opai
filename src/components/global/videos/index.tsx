"use client";
import { getAllUserVideos } from "@/actions/workspace";
import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone";
import { useQueryData } from "@/hooks/use-query-data";
import { cn } from "@/lib/utils";
import { VideosTypes } from "@/types/index.types";
import { FC } from "react";
import { SectionHeader } from "../section-header";

interface VideosProps {
  folderId: string;
  videosKey: string;
  workspaceId: string;
}

export const Videos: FC<VideosProps> = ({
  folderId,
  videosKey,
  workspaceId,
}) => {
  const { data: videoData } = useQueryData([videosKey], () =>
    getAllUserVideos(folderId),
  );
  const { status: videoStatus, data: videos } = videoData as VideosTypes;
  return (
    <div className="flex flex-col gap-4 mt-4 ">
      <SectionHeader title="Videos">
        <VideoRecorderDuotone />
      </SectionHeader>
      <section
        className={cn(
          videoStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
        )}
      >
        {videoStatus === 200 ? (
          videos.map((video) => <VideoCard />)
        ) : (
          <p className="text-[#BDBDBD]">No videos in the folder</p>
        )}
      </section>
    </div>
  );
};
