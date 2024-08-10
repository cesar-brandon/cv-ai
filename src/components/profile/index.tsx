"use client";
import type { Resume, User } from "@prisma/client";
import { ProfileHeader } from "./profile-header";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import { ProfileResume } from "./profile-resume";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Eye } from "lucide-react";

export function Profile({
  user,
  resume,
}: {
  user: User;
  resume: Resume | null;
}) {
  const router = useRouter();
  if (!resume?.content) {
    router.push("/cv-options");
  }
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className="w-full sm:w-[25rem] md:w-[36rem] flex flex-col gap-4">
      <ProfileHeader name={user.name} />
      <div className="flex items-center gap-4">
        {resume?.url && (
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={resume?.url}
            target="_blank"
          >
            {isDesktop ? "Ver Curriculum" : <Eye className="w-5 h-5" />}
          </Link>
        )}
        <Button
          className="w-full"
          onClick={() => router.push("/cv-options")}
          variant="secondary"
        >
          {resume?.content ? "Actualizar Curriculum" : "Crear Curriculum"}
        </Button>
      </div>
      {resume?.content && <ProfileResume resume={resume.content} />}
    </div>
  );
}
