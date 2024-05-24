"use client";
import type { Resume, User } from "@prisma/client";
import { ProfileHeader } from "./profile-header";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function Profile({
  user,
  resume,
}: {
  user: User;
  resume: Resume | null;
}) {
  const router = useRouter();

  if (!resume) {
    router.push("/cv-options");
  }
  return (
    <div className="w-[20rem] lg:w-[36rem] flex flex-col gap-4">
      <ProfileHeader name={user.name} />
      {resume ? (
        <div className="w-full h-[13rem] rounded-[3rem] bg-muted p-6 flex gap-4 overflow-hidden">
          <p>{JSON.stringify(resume.content)}</p>
        </div>
      ) : (
        <Button onClick={() => router.push("/cv-options")} variant="secondary">
          Enviar CV
        </Button>
      )}
    </div>
  );
}
