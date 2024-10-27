"use client";
import { getNotifications } from "@/actions/user";
import { getWorkSpaces } from "@/actions/workspace";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MENU_ITEMS } from "@/constants";
import { useQueryData } from "@/hooks/use-query-data";
import { NotificationProps, WorkspaceProps } from "@/types/index.types";
import { Menu, PlusCircle } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { GlobalCard } from "../global-card";
import { Modal } from "../modal";
import { Search } from "../search";
import { SidebarItem } from "./sidebar-item";
import { SidebarTitle } from "./sidebar-title";
import { WorkspacePlaceholder } from "./workspace-placeholder";
import { InfoBar } from "../info-bar";

interface SidebarProps {
  activeWorkspaceId: string;
}

export const Sidebar: FC<SidebarProps> = ({ activeWorkspaceId }) => {
  const router = useRouter();
  const pathName = usePathname();

  // change workspace
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };
  // get workspace data
  const { data, isFetched } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: workspace } = data as WorkspaceProps;

  // get notifications
  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications,
  );
  const { data: count } = notifications as NotificationProps;

  const menuItems = MENU_ITEMS(activeWorkspaceId);

  const currentWorkspace = workspace.workspace.find(
    (s) => s.id === activeWorkspaceId,
  );
  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <Image src="/opai-logo.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl">opai</p>
      </div>
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="mt-16 text-neutral-400 bg-transparent">
          <SelectValue placeholder="Select a workspace" />
        </SelectTrigger>
        <SelectContent className="bg-[#111111] backdrop-blur-xl">
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            <Separator />
            {workspace.workspace.map((ws) => (
              <SelectItem key={ws.id} value={ws.id}>
                {ws.name}
              </SelectItem>
            ))}
            {workspace.members.length > 0 &&
              workspace.members.map(
                (ws) =>
                  ws.WorkSpace && (
                    <SelectItem value={ws.WorkSpace.id} key={ws.WorkSpace.id}>
                      {ws.WorkSpace.name}
                    </SelectItem>
                  ),
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkspace?.type === "PUBLIC" &&
        workspace.subscription?.plan == "PRO" && (
          <Modal
            trigger={
              <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-t-neutral-800/60 rounded-sm w-full p-[5px] gap-2">
                <PlusCircle
                  className="text-neutral-800/90 fill-neutral-500"
                  size={15}
                />
                <span className="text-neutral-400 font-semibold text-xs">
                  Invite to workspace
                </span>
              </span>
            }
            title="Invite To Workspace"
            description="Invite other users to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}
      {/* SideBar Menu */}
      <SidebarTitle>Menu</SidebarTitle>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
              notification={
                (item.title === "Notifications" &&
                  count._count &&
                  count._count.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5" />
      {/* Workspaces */}
      <SidebarTitle>Workspaces</SidebarTitle>
      <nav className="w-full">
        <ul className="h-[150px] overflow-auto overflow-x-hidden fade-layer">
          {workspace.workspace.length > 0 &&
            workspace.workspace.map(
              (item) =>
                item.type !== "PERSONAL" && (
                  <SidebarItem
                    href={`/dashboard/${item.id}`}
                    selected={pathName === `/dashboard/${item.id}`}
                    title={item.name}
                    notification={0}
                    key={item.name}
                    icon={
                      <WorkspacePlaceholder>
                        {item.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                ),
            )}
          {workspace.members.length > 0 &&
            workspace.members.map((item) => (
              <SidebarItem
                href={`/dashboard/${item.WorkSpace.id}`}
                selected={pathName === `/dashboard/${item.WorkSpace.id}`}
                title={item.WorkSpace.name}
                notification={0}
                key={item.WorkSpace.name}
                icon={
                  <WorkspacePlaceholder>
                    {item.WorkSpace.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
              />
            ))}
        </ul>
      </nav>
      {/* Pricing card */}
      <Separator className="w-4/5" />
      {workspace.subscription?.plan === "FREE" && (
        <GlobalCard
          title="Upgrade to Pro"
          description=" Unlock AI features like transcription, AI summary, and more."
          // footer={<PaymentButton />}
          footer={<Button>Payment</Button>}
        />
      )}
    </div>
  );

  return (
    <div className="full">
      <InfoBar />
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={"ghost"} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
}