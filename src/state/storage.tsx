import { MiniDb } from "jotai-minidb";
import { nanoid } from "nanoid";
import { AllEvent } from "../util/cube";
import { DefaultColorScheme } from "@mui/joy/styles/types";
import { atomFamily } from "jotai/utils";
import { WritableAtom } from "jotai";

export const defaultFreezeTimeLength = 200;

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

export const defaultSession = createSession("My Session", Date.now(), "default");

const initialData = {
	sessions: { [defaultSession.id]: defaultSession },
	solves: [],
	"current-session": defaultSession.id,
	"color-scheme": "system",
	"freeze-time-length": defaultFreezeTimeLength,
	"ask-before-delete": true,
} satisfies DbShape;

export const _storageDb = new MiniDb<DbShape[keyof DbShape]>({
	name: "qbq-data",
	initialData: initialData,
	version: 0,
	migrations: {

	}
});



function familyGetter<DbParam extends keyof DbShape>(param: DbParam): WritableAtom<DbShape[DbParam] | undefined, [DbShape[DbParam]], Promise<void>> {
	// SAFETY: there is a potential scenario where the type of a field that's defined in DbShape doesn't match the actual type that exists in the MiniDb.
	// For example, if a refactor has changed the type of a field. This could potentially, currently, result in an error, and it means this function is type-unsound.
	// The way to handle this is to make use of the version field and onVersionMismatch method in the constructor of MiniDb, or better yet add a migration function
	// that checks the sanctity of the data.
	// Adding a new field to the DB will always be safe because we force the end user to handle undefined. Removing a field will always be safe because we 
	// require that the parameter be a key of the DB.
	return (_storageDb.item(param) as WritableAtom<DbShape[DbParam] | undefined, [DbShape[DbParam]], Promise<void>>
	);
}


export const storageDb: typeof familyGetter = atomFamily(familyGetter);

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
