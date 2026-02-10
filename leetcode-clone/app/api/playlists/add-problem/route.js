import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST - Add a problem to a playlist
export async function POST(request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { problemId, playlistId } = body;

    if (!problemId || !playlistId) {
      return NextResponse.json(
        { success: false, error: "Problem ID and Playlist ID are required" },
        { status: 400 },
      );
    }

    // Verify the playlist belongs to the user
    const playlist = await db.playlist.findFirst({
      where: {
        id: playlistId,
        userId: dbUser.id,
      },
    });

    if (!playlist) {
      return NextResponse.json(
        { success: false, error: "Playlist not found or access denied" },
        { status: 404 },
      );
    }

    // Check if problem exists
    const problem = await db.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      return NextResponse.json(
        { success: false, error: "Problem not found" },
        { status: 404 },
      );
    }

    // Check if problem is already in the playlist
    const existingEntry = await db.problemInPlaylist.findUnique({
      where: {
        playlistId_problemId: {
          playlistId,
          problemId,
        },
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        { success: false, error: "Problem is already in this playlist" },
        { status: 400 },
      );
    }

    // Add the problem to the playlist
    const problemInPlaylist = await db.problemInPlaylist.create({
      data: {
        playlistId,
        problemId,
      },
    });

    return NextResponse.json({ success: true, data: problemInPlaylist });
  } catch (error) {
    console.error("Error adding problem to playlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add problem to playlist" },
      { status: 500 },
    );
  }
}
