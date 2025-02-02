import { atom } from "jotai";
import { Session, storageDb } from "./storage";

export const sessionsAtom = storageDb("sessions");

export const currentSessionIdAtom = storageDb("current-session");
export const currentSessionAtom = atom<Session | null, [Session], void>((get) => {
	const sessionId = get(currentSessionIdAtom);
	const session = get(sessionsAtom)[sessionId];
	return session || null;
}, (get, set, session: Session) => {
	const sessions = get(sessionsAtom);
	const sessionId = get(currentSessionIdAtom);
	sessions[sessionId] = session;
	set(sessionsAtom, {...sessions});
	// set(currentSessionIdAtom, get(currentSessionIdAtom))
})