"use server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { db } from "@/lib/prisma";
import PdfParse from "pdf-parse";

export async function sectionCv(file: any) {
  "use server";

  try {
    const user = await db.user.findFirst();
    if (!user) throw new Response("User not found", { status: 404 });

    const pdfData = await PdfParse(file);

    const { object: content } = await generateObject({
      model: google("models/gemini-1.5-pro-latest"),
      system: "divide and section resume",
      prompt: pdfData.text,
      schema: z.object({
        object: z.object({
          about: z.string(),
          experience: z.object({
            title: z.string(),
            description: z.string(),
          }),
          skills: z.string(),
          projects: z.object({
            title: z.string(),
            description: z.string(),
          }),
        }),
      }),
    });

    await db.resume.update({
      where: { id: user.id },
      data: {
        content: content,
      },
    });

    const resume = await db.resume.findFirst({
      where: { id: user.id },
    });
    return resume;
  } catch (e) {
    return new Response("Error", { status: 500 });
  }
}
