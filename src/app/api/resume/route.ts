import { db } from "@/lib/prisma";
import { Resume } from "../pdf/route";

interface RequestBody {
  id: string;
  content: Resume;
}

export async function POST(req: Request) {
  try {
    const { content, id }: RequestBody = await req.json();
    const resume = await db.resume.findFirst({
      where: {
        userId: id,
      },
    });
    if (!resume) return new Response("Resume not found", { status: 404 });
    await db.resume.update({
      where: {
        id: resume.id,
      },
      data: {
        content,
      },
    });

    return new Response("Resume updated successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create user", { status: 500 });
  }
}
