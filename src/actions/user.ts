"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Type } from "@prisma/client";

/*
 * 1 -> Get user from clerk provider
 * 2 -> Check if user exist in our database
 * 3 -> If the user exist in our database, then return user information
 * 4 -> else create the user in our database
 * 5 -> return user information
 */
export async function onAuthenticatedUser() {
  try {
    // get logged in user information from clerk
    const clerkUser = await currentUser();
    if (!clerkUser) return { status: 401, message: "Unauthenticated" };
    // check if user exist in our database
    const userExist = await db.user.findUnique({
      where: {
        clerkid: clerkUser.id,
      },
      include: {
        workspace: true,
      },
    });
    // If the user exist in our database, then return user information
    if (userExist) {
      return {
        status: 200,
        user: userExist,
      };
    }
    // else create the user in our database
    const newUser = await db.user.create({
      data: {
        clerkid: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstname: clerkUser.firstName,
        lastname: clerkUser.lastName,
        image: clerkUser.imageUrl,
        studio: {
          create: {},
        },
        subscription: {},
        // By default every user will have a personal workspace
        workspace: {
          create: {
            name: `${clerkUser.firstName}'s Workspace`,
            type: Type.PERSONAL,
          },
        },
      },
      include: {
        workspace: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    return {
      status: 201,
      user: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
}

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const notifications = await db.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (notifications && notifications.notification.length > 0)
      return { status: 200, data: notifications };
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 400, data: [] };
  }
};
