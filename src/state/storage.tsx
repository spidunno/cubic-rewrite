import { MiniDb } from "jotai-minidb";
import { nanoid } from "nanoid";
import { AllEvent } from "../util/cube";
import { DefaultColorScheme } from "@mui/joy/styles/types";
import { atomFamily } from "jotai/utils";
import { WritableAtom } from "jotai";

export const defaultFreezeTimeLength = 250;

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

export interface DbShape {
	sessions: Record<string, Session | undefined>;
	solves: DatabaseSolve[];
	"current-session": string;
	"color-scheme": DefaultColorScheme | "system";
	"freeze-time-length": number;
	"ask-before-delete": boolean;
}

const defaultSession = createSession("My Session", Date.now(), "default");

export const _storageDb = new MiniDb<DbShape[keyof DbShape]>({
	name: "qbq-data",
	// @ts-expect-error
	initialData: {
		sessions: {[defaultSession.id]: defaultSession},
		solves: [],
		"current-session": defaultSession.id,
		"color-scheme": "system",
		"freeze-time-length": defaultFreezeTimeLength,
		"ask-before-delete": true
	} as DbShape,
});

type FamilyGetter = <T extends keyof DbShape>(param: T) => WritableAtom<DbShape[T], [DbShape[T]], Promise<void>>;
function familyGetter(param: keyof DbShape) {
	return _storageDb.item(param) as unknown as WritableAtom<DbShape[keyof DbShape], [DbShape[keyof DbShape]], Promise<void>>
}

export const storageDb = atomFamily(familyGetter) as FamilyGetter;

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
