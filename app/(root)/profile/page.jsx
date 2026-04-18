import { getCurrentUserData } from "@/modules/auth/actions";
import PlaylistsSection from "@/modules/profile/components/playlist-section";
import ProfileStats from "@/modules/profile/components/profile-stats";
import SolvedProblems from "@/modules/profile/components/solved-problems";
import SubmissionsHistory from "@/modules/profile/components/submission-history";
import UserInfoCard from "@/modules/profile/components/user-info-card";
import React from "react";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const profileData = await getCurrentUserData();
  console.log("[DEBUG] Rendering ProfilePage. Data received:", !!profileData);

  if (!profileData) {
    console.log("[DEBUG] Profile data missing, redirecting to sign-in");
    redirect("/sign-in?redirect_url=/profile");
  }

  return (
    <div className="min-h-screen py-32" id="codeforge-profile-page-container">
      <div className="container mx-auto px-4 max-w-7xl">
        <UserInfoCard userData={profileData} />

        <ProfileStats
          submissions={profileData.submissions || []}
          solvedCount={profileData.solvedProblems?.length ?? 0}
          playlistCount={profileData.playlists?.length ?? 0}
        />

        <SubmissionsHistory submissions={profileData.submissions || []} />

        <div className="grid  gap-8">
          <SolvedProblems solvedProblems={profileData.solvedProblems || []} />
          <PlaylistsSection playlists={profileData.playlists || []} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
