import { onBoardUser } from "@/modules/auth/actions";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  await onBoardUser();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <h1 className="text-3xl font-bold">Welcome to LeetCode Clone</h1>
      <UserButton />
    </div>
  );
}
