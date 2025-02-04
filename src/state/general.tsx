import { atom } from "jotai";
import { defaultSession, Session, storageDb } from "./storage";

export const sessionsAtom = storageDb("sessions");

export const currentSessionIdAtom = storageDb("current-session");
export const currentSessionAtom = atom<Session | null, [Session], void>((get) => {
	const sessionId = get(currentSessionIdAtom) || "default";
	const session = (get(sessionsAtom)||{[defaultSession.id]: defaultSession})[sessionId];
	return session || null;
}, (get, set, session: Session) => {
	const sessions = (get(sessionsAtom)||{[defaultSession.id]: defaultSession});
	const sessionId = get(currentSessionIdAtom) || "default";
	sessions[sessionId] = session;
	set(sessionsAtom, {...sessions});
	// set(currentSessionIdAtom, get(currentSessionIdAtom))
})
export const solvesAtom = storageDb("solves");