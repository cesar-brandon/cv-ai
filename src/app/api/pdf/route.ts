import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { db } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import PDFParser from "pdf2json";

const resumeSchema = z.object({
  about: z.string(),
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      description: z.string(),
    }),
  ),
  skills: z.array(z.string()),
  projects: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      url: z.string(),
    }),
  ),
});

export type Resume = z.infer<typeof resumeSchema>;

export async function POST(req: Request) {
  let tempFilePath = "";
  try {
    const formData = await req.formData();
    const uploadedFile = formData.values().next().value;
    let fileName = "";
    let parsedText = "";

    if (uploadedFile instanceof File) {
      fileName = uuidv4();
      tempFilePath = `./public/${fileName}.pdf`;
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

      // Save the buffer as a file
      await fs.writeFile(tempFilePath, fileBuffer);
      const pdfParser = new (PDFParser as any)(null, 1);

      pdfParser.on("pdfParser_dataError", (errData: any) =>
        console.log(errData.parserError),
      );

      pdfParser.on("pdfParser_dataReady", () => {
        parsedText = (pdfParser as any).getRawTextContent();
      });

      pdfParser.loadPDF(tempFilePath);
    } else {
      return new Response("No file uploaded", { status: 400 });
    }

    const user = await db.user.findFirst();
    if (!user) return new Response("Unauthorized", { status: 401 });

    const { object: content } = await generateObject({
      model: google("models/gemini-1.5-pro-latest"),
      system: `analiza la informacion del curriculum en texto plano y devuelve un objeto en el formato correcto, con la informacion recolectada.`,
      prompt: parsedText,
      schema: resumeSchema,
    });

    return new Response(JSON.stringify(content), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  } finally {
    if (tempFilePath) {
      await fs.unlink(tempFilePath);
    }
  }
}
