import { ResumeImportCard } from "@/components/resume-import-card";
import getUser from "@/lib/data/getUser";

export default async function Page() {
  const user = await getUser();
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-foreground/20 z-10">
      <div className="container flex items-center h-dvh max-w-lg mx-auto">
        <ResumeImportCard userId={user.id} />
      </div>
    </div>
  );
}
