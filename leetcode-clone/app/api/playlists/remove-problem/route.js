import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// DELETE - Remove a problem from a playlist
export async function DELETE(request) {
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

    const { searchParams } = new URL(request.url);
    const problemId = searchParams.get("problemId");
    const playlistId = searchParams.get("playlistId");

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

    // Remove the problem from the playlist
    await db.problemInPlaylist.delete({
      where: {
        playlistId_problemId: {
          playlistId,
          problemId,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Problem removed from playlist",
    });
  } catch (error) {
    console.error("Error removing problem from playlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove problem from playlist" },
      { status: 500 },
    );
  }
}
