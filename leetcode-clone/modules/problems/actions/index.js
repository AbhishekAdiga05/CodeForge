"use server";

import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getLanguageName, pollBatchResults, submitBatch } from "@/lib/judge0";

// Get all problems with solved status
export const getAllProblems = async () => {
  try {
    const user = await currentUser();
    const data = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });
    const problems = await db.problem.findMany({
      include: {
        solvedBy: {
          where: {
            userId: data.id,
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { success: true, data: problems };
  } catch (error) {
    console.error("❌ Error fetching problems:", error);
    return { success: false, error: "Failed to fetch problems" };
  }
};

// Get a single problem by ID
export const getProblemById = async(id) => {
    try {
        const problem = await db.problem.findUnique({
            where: {
                id: id,
            },
        });
        return { success: true, data: problem };
    } catch (error) {
        console.error("❌ Error fetching problem:", error);
        return { success: false, error: "Failed to fetch problem" };
    }
}

// Get all problems solved by the current user
export const getAllProblemSolvedByUser = async() => {
    try {
        const user = await currentUser();
        const userId = await db.user.findUnique({
            where: {
                clerkId: user.id,
            },
            select: {
                id: true,
            },
        });

        const problems = await db.problem.findMany({
            include: {
                solvedBy: {
                  where: {
                    userId: userId.id,
                  },
                },
            },
        });
        return { success: true, data: problems };
    } catch (error) {
        console.error("❌ Error fetching solved problems:", error);
        return { success: false, error: "Failed to fetch solved problems" };
    }
}

// Delete a problem (admin only)
export const deleteProblem = async (problemId) => {
    try {
        const user = await currentUser();

        if (!user) {
            throw new Error("Unauthorized");
        }

        // Verify if user is admin
        const dbUser = await db.user.findUnique({
            where: { clerkId: user.id },
            select: { role: true }
        });

        if (dbUser?.role !== UserRole.ADMIN) {
            throw new Error("Only admins can delete problems");
        }

        await db.problem.delete({
            where: { id: problemId }
        });

        revalidatePath("/problems");
        return { success: true, message: "Problem deleted successfully" };
    } catch (error) {
        console.error("Error deleting problem:", error);
        return { success: false, error: error.message || "Failed to delete problem" };
    }
}
