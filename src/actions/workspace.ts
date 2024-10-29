"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function verifyAccessToWorkspace(workspaceId: string) {
  try {
    const user = await currentUser();
    if (!user)
      return {
        status: 403,
        message: "Unauthorized",
      };
    const isUserInWorkspace = await db.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });
    return {
      status: 200,
      data: {
        workspace: isUserInWorkspace,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      status: 403,
      data: {
        workspace: null,
      },
    };
  }
}

export async function getWorkspaceFolders(workSpaceId: string) {
  try {
    const isFolders = await db.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (isFolders && isFolders.length > 0) {
      return {
        status: 200,
        data: isFolders,
      };
    }
    return {
      status: 404,
      message: "Folders not found",
      data: [],
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
      data: [],
    };
  }
}

export async function getAllUserVideos(workSpaceId: string) {
  try {
    const user = await currentUser();
    if (!user) return { status: 404, message: "User not found" };
    const videos = await db.video.findMany({
      where: {
        OR: [
          {
            workSpaceId,
          },
          {
            folderId: workSpaceId,
          },
        ],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (videos && videos.length > 0) {
      return {
        status: 200,
        data: videos,
      };
    }
    return {
      status: 404,
      message: "Videos not found",
      data: [],
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
      data: [],
    };
  }
}

export async function getWorkSpaces() {
  try {
    const user = await currentUser();
    if (!user) return { status: 404, message: "User not found" };
    const workspaces = await db.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
    if (workspaces) {
      return {
        status: 200,
        data: workspaces,
      };
    }
    return {
      status: 404,
      message: "Workspaces not found",
      data: [],
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Internal server error",
      data: [],
    };
  }
}

export async function onCreateWorkspace(name: string) {
  try {
    const user = await currentUser();
    if (!user) return { status: 404, message: "User not found" };
    const authorized = await db.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (authorized?.subscription?.plan === "PRO") {
      const workspace = await db.user.update({
        where: { clerkid: user.id },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });
      if (workspace) {
        return { status: 201, data: "Workspace Created" };
      }
    }
    return { status: 401, data: "Not authorized" };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      data: "Bad request",
    };
  }
}

export async function renameFolders(folderId: string, name: string) {
  try {
    const folder = await db.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });
    if (folder) return { status: 200, data: "Folder Renamed" };
    return { status: 404, data: "Folder not found" };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: "Internal server error",
    };
  }
}
