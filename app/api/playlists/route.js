import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Fetch all playlists for the current user
export async function GET() {
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

    const playlists = await db.playlist.findMany({
      where: { userId: dbUser.id },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: playlists });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch playlists" },
      { status: 500 },
    );
  }
}

// POST - Create a new playlist
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
    const { name, description } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Playlist name is required" },
        { status: 400 },
      );
    }

    // Check if playlist with same name already exists for this user
    const existingPlaylist = await db.playlist.findUnique({
      where: {
        name_userId: {
          name: name.trim(),
          userId: dbUser.id,
        },
      },
    });

    if (existingPlaylist) {
      return NextResponse.json(
        { success: false, error: "A playlist with this name already exists" },
        { status: 400 },
      );
    }

    const playlist = await db.playlist.create({
      data: {
        name: name.trim(),
        description: description || null,
        userId: dbUser.id,
      },
    });

    return NextResponse.json({ success: true, data: playlist });
  } catch (error) {
    console.error("Error creating playlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create playlist" },
      { status: 500 },
    );
  }
}
