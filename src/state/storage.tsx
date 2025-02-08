import { MiniDb } from "jotai-minidb";
import { nanoid } from "nanoid";
import { AllEvent } from "../util/cube";
import { atom } from "jotai";

export interface Session {
	id: string;
	name: string;
	createdAt: number;
	cube_type: AllEvent;
}
export interface DatabaseSolve {
	id: string;
	cube_type: AllEvent;

	createdAt: number;
	endedAt: number;

	dnf: boolean;
	plusTwo: boolean;

	rawTime: number;
	time: number;

	scramble: string;

	sessionId: string;
}

export const defaultSession = createSession("My Session", Date.now(), "default");

export const sessionsDb = new MiniDb<Session>({
	name: "qbq-sessions",
	initialData: {
		[defaultSession.id]: defaultSession
	},
});

export const solvesDb = new MiniDb<DatabaseSolve>({
	name: "qbq-solves",
});

export const sortedSolvesAtom = atom(get => get(solvesDb.values).sort((a,b) => b.time - a.time ));

export function createSession(
	name: string,
	createdAt = Date.now(),
	id = nanoid()
): Session {
	return {
		id,
		name,
		createdAt,
		cube_type: "333"
	};
}
