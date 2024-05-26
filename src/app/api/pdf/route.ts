import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { db } from "@/lib/prisma";
import PdfParse from "pdf-parse";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import PDFParser from "pdf2json"; // To parse the pdf

export async function POST(req: Request, res: Response) {
  try {
    const formData = await req.formData();
    console.log(formData);
    const uploadedFile = formData.values().next().value;
    let fileName = "";
    let parsedText = "";
    console.log(uploadedFile);

    if (uploadedFile instanceof File) {
      fileName = uuidv4();
      const tempFilePath = `./tmp/${fileName}.pdf`;
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      // Save the buffer as a file
      await fs.writeFile(tempFilePath, fileBuffer);
      const pdfParser = new (PDFParser as any)(null, 1);

      pdfParser.on("pdfParser_dataError", (errData: any) =>
        console.log(errData.parserError)
      );

      pdfParser.on("pdfParser_dataReady", () => {
        console.log((pdfParser as any).getRawTextContent());
        parsedText = (pdfParser as any).getRawTextContent();
      });

      pdfParser.loadPDF(tempFilePath);
    } else {
      console.log("Uploaded file is not in the expected format.");
    }

    const user = await db.user.findFirst();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const { object: content } = await generateObject({
      model: google("models/gemini-1.5-pro-latest"),
      system: "reads the resume they enter, divides it and section the resume",
      prompt: parsedText,
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

    let resume = await db.resume.findFirst({
      where: { id: user.id },
    });

    if (resume) {
      await db.resume.update({
        where: { id: user.id },
        data: { content },
      });
    }
    resume = await db.resume.findFirst({
      where: { id: user.id },
    });

    return new Response(JSON.stringify(resume?.content), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
