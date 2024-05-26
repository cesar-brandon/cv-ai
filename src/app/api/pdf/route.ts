import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { db } from "@/lib/prisma";
import PdfParse from "pdf-parse";

export async function POST(req: Request) {
  try {
    const user = await db.user.findFirst();
    console.log(user);
    if (!user) throw new Response("User not found", { status: 404 });

    console.log(req);
    const { file } = await req.json();
    const dataBuffer = Buffer.from(file, "base64");
    const pdfData = await PdfParse(dataBuffer);
    const text = pdfData.text;

    const { object: content } = await generateObject({
      model: google("models/gemini-1.5-pro-latest"),
      system: "divide and section resume",
      prompt: text,
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
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
