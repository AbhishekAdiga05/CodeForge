"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticated user found" };
    }

    const { id, firstName, lastName, imageUrl, emailAddresses } = user;

    const newUser = await db.user.upsert({
      where: {
        clerkId: id,
      },
      update: {
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: emailAddresses[0]?.emailAddress || "",
      },
      create: {
        clerkId: id,
        firstName: firstName || null,
        lastName: lastName || null,
        imageUrl: imageUrl || null,
        email: emailAddresses[0]?.emailAddress || "",
      },
    });

    return {
      success: true,
      user: newUser,
      message: "User onboarded successfully",
    };
  } catch (error) {
    console.error("❌ Error onboarding user:", error);
    return {
      success: false,
      error: "Failed to onboard user",
    };
  }
};

export const currentUserRole = async () => {
  try {
    const user = await currentUser();

    if (!user) return null;

    const { id } = user;

    const userRole = await db.user.findUnique({
      where: {
        clerkId: id,
      },
      select: {
        role: true,
      },
    });

    return userRole?.role ?? null;
  } catch (error) {
    console.error("❌ Error fetching user role:", error);
    return null;
  }
};

export const getCurrentUserData = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const { id } = user;

    const dbUser = await db.user.findUnique({
      where: {
        clerkId: id,
      },
      include: {
        solvedProblems: {
          include: {
            problem: true,
          },
        },
        playlists: {
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
          },
        },
        submissions: {
          include: {
            problem: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!dbUser) {
      return {
        solvedProblems: [],
        playlists: [],
        submissions: [],
      };
    }

    return {
      ...dbUser,
      solvedProblems: dbUser.solvedProblems || [],
      playlists: dbUser.playlists || [],
      submissions: dbUser.submissions || [],
    };
  } catch (error) {
    console.error("❌ Error fetching current user:", error);
    return {
      solvedProblems: [],
      playlists: [],
      submissions: [],
    };
  }
};
