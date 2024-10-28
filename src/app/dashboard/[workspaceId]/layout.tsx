import { getNotifications, onAuthenticatedUser } from "@/actions/user";
import {
  getAllUserVideos,
  getWorkspaceFolders,
  getWorkSpaces,
  verifyAccessToWorkspace,
} from "@/actions/workspace";
import { GlobalHeader } from "@/components/global/global-header";
import { Sidebar } from "@/components/global/sidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { FC } from "react";
/**
 * First check authenticated user's workspace
 * if there is no workspace then redirect to sign in page because new user will have one private workspace automatically.
 * if there is no workspace then redirect to correct workspace
 * esle return null;
 */
interface WorkspaceLayoutProps {
  children: React.ReactNode;
  params: { workspaceId: string };
}

const WorkspaceLayout: FC<WorkspaceLayoutProps> = async ({
  params: { workspaceId },
  children,
}) => {
  const auth = await onAuthenticatedUser();
  if (!auth.user?.workspace) redirect("/auth/sign-in");
  if (!auth.user.workspace.length) redirect("/auth/sign-in");

  const hasAccess = await verifyAccessToWorkspace(workspaceId);
  if (hasAccess.status !== 200)
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);

  if (!hasAccess.data?.workspace) return null;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkSpaces(),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <Sidebar activeWorkspaceId={workspaceId} />
        <div className="w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden">
          <GlobalHeader workspace={hasAccess.data.workspace} />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default WorkspaceLayout;
