"use client";
import type { Resume, User } from "@prisma/client";
import { ProfileHeader } from "./profile-header";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { getLocalStorage } from "@/lib/utils";
import { ProfileResume } from "./profile-resume";

export function Profile({
  user,
  resume,
}: {
  user: User;
  resume: Resume | null;
}) {
  const [resumeContent, setResumeContent] = useState<Resume | null>(
    getLocalStorage("Resume", null),
  );
  const router = useRouter();
  if (!resume?.content) {
    router.push("/cv-options");
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="w-[20rem] lg:w-[36rem] flex flex-col gap-4">
        <ProfileHeader name={user.name} />
        {resume?.content ? (
          <div className="w-full h-[13rem] rounded-[3rem] bg-muted p-6 flex gap-4 overflow-hidden">
            <p>{JSON.stringify(resume.content)}</p>
          </div>
        ) : (
          <Button
            onClick={() => router.push("/cv-options")}
            variant="secondary"
          >
            Enviar CV
          </Button>
        )}
      </div>
      <ProfileResume resume={resumeContent} />
    </div>
  );
}
