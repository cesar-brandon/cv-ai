import { Profile } from "@/components/profile";
import { db } from "@/lib/prisma";
import getUser from "@/lib/data/getUser";

export default async function Home() {
  // I bring the first user for the example.
  const user = await getUser();
  if (!user) return null;
  const resume = await db.resume.findFirst({ where: { userId: user.id } });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 sm:p-24">
      <Profile user={user} resume={resume} />
    </main>
  );
}
