import { db } from "@/lib/prisma";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, password }: RequestBody = await req.json();
    await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to create user", { status: 500 });
  }
}
