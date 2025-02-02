import { atom } from "jotai";
import { Session, storageDb } from "./storage";

const sessionsAtom = storageDb("sessions");

export const currentSessionIdAtom = storageDb("current-session");
export const currentSessionAtom = atom<Session | null>((get) => {
	const session = get(sessionsAtom).filter(v => v.id === get(currentSessionIdAtom))[0];
	return session || null;
})