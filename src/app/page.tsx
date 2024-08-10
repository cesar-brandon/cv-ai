import { Profile } from "@/components/profile";
import { ProfileResume } from "@/components/profile/profile-resume";
import { db } from "@/lib/prisma";

export default async function Home() {
  // I bring the first user for the example.
  const user = await db.user.findFirst();
  if (!user) return null;
  const resume = await db.resume.findFirst({ where: { userId: user.id } });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Profile user={user} resume={resume} />
    </main>
  );
}
