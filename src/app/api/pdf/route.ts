import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { db } from "@/lib/prisma";
import PdfParse from "pdf-parse";
import { Readable } from "stream";

export async function POST(req: Request, res: Response) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    console.log(formData);
    console.log(file);
    const user = await db.user.findFirst();
    if (!user) return new Response("Unauthorized", { status: 401 });
    if (!file) return new Response("No file", { status: 400 });

    if (!(file instanceof File)) {
      return new Response("Invalid file", { status: 400 });
    }

    const stream = new Readable();
    stream.push(file);
    stream.push(null);

    let buffer = Buffer.alloc(0);

    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    const pdfData = await PdfParse(buffer);
    const text = pdfData.text;

    // const { object: content } = await generateObject({
    //   model: google("models/gemini-1.5-pro-latest"),
    //   system: "divide and section resume",
    //   prompt: text,
    //   schema: z.object({
    //     object: z.object({
    //       about: z.string(),
    //       experience: z.object({
    //         title: z.string(),
    //         description: z.string(),
    //       }),
    //       skills: z.string(),
    //       projects: z.object({
    //         title: z.string(),
    //         description: z.string(),
    //       }),
    //     }),
    //   }),
    // });
    // await db.resume.update({
    //   where: { id: user.id },
    //   data: {
    //     content: content,
    //   },
    // });

    // const resume = await db.resume.findFirst({
    //   where: { id: user.id },
    // });
    return new Response(JSON.stringify(text), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
