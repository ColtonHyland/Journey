import 'server-only';
import { getToken } from "next-auth/jwt"

export async function getServerUser(req) {
  const token = await getToken({ req })
  return JSON.stringify(token?.id);
}