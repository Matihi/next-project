import { cookies } from "next/headers";
import { sessionArray, findSession, deleteSessionFromDb } from "./db";

const createSession = async (id) => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const sessionId = crypto.randomUUID();

  const session =
    id === "34786aed-686c-4165-8ddf-53c863e827ba"
      ? {
          sessionId: "87272b7b-7a27-4608-b585-20203e84c371",
          userId: "34786aed-686c-4165-8ddf-53c863e827ba",
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }
      : id === "4cf7a8c6-56a5-48c2-bf05-c552fa871588"
        ? {
            sessionId: "fb8b1bc8-7b2b-4bf4-b051-0133474feb9e",
            userId: "4cf7a8c6-56a5-48c2-bf05-c552fa871588",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          }
        : {
            sessionId: "0d20dcb1-68f2-4570-b90b-364617adb8a4",
            userId: "f68b54e4-1563-4126-a7fc-126affd2bf14",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          };

  sessionArray.push(session);

  const cookieStore = await cookies();
  cookieStore.set("session", session.sessionId, {
    httpOnly: true,
    secure: true,
    expires: new Date(session.expiresAt),
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
