import { cookies } from "next/headers";
import { sessionArray, findSession, deleteSessionFromDb } from "./db";

const createSession = async (id) => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const sessionId = crypto.randomUUID();

  const session = {
    sessionId,
    userId: id,
    expiresAt,
  };

  sessionArray.push(session);

  const cookieStore = await cookies();
  cookieStore.set("session", sessionId, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  if (!sessionId) {
    return null;
  }
  const session = await findSession(sessionId);
  return session;
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
  cookieStore.delete("session");
  deleteSessionFromDb(sessionId);
};

export default createSession;
