import 'server-only';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function getServerUser(request) {
  const session = await getServerSession(request, {}, authOptions);
  const user = session?.user;
  return [user]; // Handle cases where there is no session/user
}