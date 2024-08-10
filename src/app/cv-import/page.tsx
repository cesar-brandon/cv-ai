import getUser from "@/lib/data/getUser";
import { ResumeImportCard } from "@/components/resume-import-card";

export default async function ResumeImportPage() {
  const user = await getUser();
  if (!user) return null;

  return (
    <div className="container flex items-center h-dvh max-w-lg mx-auto">
      <ResumeImportCard userId={user.id} />
    </div>
  );
}
