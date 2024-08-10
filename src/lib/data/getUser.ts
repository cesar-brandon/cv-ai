import { cache } from "react";
import { db } from "@/lib/prisma";

const getUser = async () => {
  const user = await db.user.findFirst();
  return user;
};

export default cache(getUser);
