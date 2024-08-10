import { db } from "@/lib/prisma";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: "2MB" } })
    .middleware(async ({ req }) => {
      // I bring the first user for the example.
      const user = await db.user.findFirst();

      if (!user || !user.id) throw new UploadThingError("User not found");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const resume = await db.resume.findFirst({
        where: {
          userId: metadata.userId,
        },
      });
      if (resume) {
        await db.resume.update({
          where: {
            id: resume.id,
          },
          data: {
            url: `https://utfs.io/f/${file.key}`,
          },
        });
      } else {
        await db.resume.create({
          data: {
            userId: metadata.userId,
            url: `https://utfs.io/f/${file.key}`,
          },
        });
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
