"use client";

import React, { useState } from "react";
import { List, Calendar, FileText, BookOpen, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PlaylistsSection = ({ playlists: initialPlaylists }) => {
  const [playlists, setPlaylists] = useState(initialPlaylists || []);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      setIsDeleting(true);
      const response = await fetch(`/api/playlists/${playlistId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete playlist");
      }

      const data = await response.json();

      if (data.success) {
        setPlaylists(playlists.filter((p) => p.id !== playlistId));
        toast.success("Playlist deleted successfully");
        router.refresh();
      } else {
        throw new Error(data.error || "Failed to delete playlist");
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
      toast.error(error.message || "Failed to delete playlist");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <List className="w-6 h-6 text-blue-500" />
          <CardTitle className="text-2xl">Playlists</CardTitle>
          <Badge variant="secondary">{playlists.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {playlists.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <List className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No Playlists Created</h3>
            <p className="text-muted-foreground">
              Create your first playlist to organize your problems!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {playlists.map((playlist) => (
              <Card
                key={playlist.id}
                className="hover:shadow-md transition-all duration-200 bg-blue-50 dark:bg-blue-950/50 group relative"
              >
                <CardContent className="p-6">
                  <div className="absolute top-4 right-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Playlist</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &quot;
                            {playlist.name}
                            &quot;? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeletePlaylist(playlist.id)}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 pr-8">
                      <h3 className="font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {playlist.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {playlist.description || "No description"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium">
                      {playlist.problems?.length || 0} problem
                      {(playlist.problems?.length || 0) !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Show first few problems if available */}
                  {playlist.problems?.length > 0 && (
                    <div className="mb-4 space-y-1">
                      {playlist.problems.slice(0, 3).map((item) => (
                        <Link
                          key={item.id}
                          href={`/problem/${item.problemId}`}
                          className="block text-xs text-muted-foreground hover:text-blue-500 truncate"
                        >
                          • {item.problem?.title || "Problem"}
                        </Link>
                      ))}
                      {playlist.problems.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{playlist.problems.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>Created {formatDate(playlist.createdAt)}</span>
                    </div>
                    {playlist.createdAt !== playlist.updatedAt && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Updated {formatDate(playlist.updatedAt)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaylistsSection;
