import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/use-search";
import { User } from "lucide-react";
import { FC } from "react";
import { Loader } from "../loader";

interface SearchProps {
  workspaceId: string;
}

export const Search: FC<SearchProps> = ({ workspaceId }) => {
  const { query, onSearchQuery, isFetching, onUsers } = useSearch(
    "get-users",
    "USERS",
  );

  //TODO: Wire up sending invitations

  // const { mutate, isPending } = useMutationData(
  //   ["invite-member"],
  //   (data: { recieverId: string; email: string }) =>
  //     inviteMembers(workspaceId, data.recieverId, data.email),
  // );

  return (
    <div className="flex flex-col gap-y-5">
      <Input
        onChange={onSearchQuery}
        value={query}
        placeholder="Search for user..."
        type="text"
        className="bg-transparent border-2 outline-none"
      />
      {isFetching ? (
        <div className="flex flex-col gap-y-2">
          <Skeleton className="w-full h-8 rounded-xl" />
        </div>
      ) : !onUsers ? (
        <p className="text-center text-sm text-[#a4a4a4]">No users found</p>
      ) : (
        <div>
          {onUsers.map((user) => (
            <div
              key={user.id}
              className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl "
            >
              <Avatar>
                <AvatarImage src={user?.image!} />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h3 className="text-bold text-lg capitalize">
                  {user.firstname} {user.lastname}
                </h3>
                <p className="lowercase text-xs px-2 bg-white rounded-lg text-[#1e1e1e]">
                  {user.subscription?.plan}
                </p>
              </div>
              <div className="flex-1 flex justify-end items-center">
                <Button onClick={()=>{}} variant={"default"} className="w-5/12 font-bold">
                  <Loader state={isFetching} color="#000">Invite</Loader>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
