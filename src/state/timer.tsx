import { atom } from "jotai";

import { randomScrambleForEvent } from "cubing/scramble";
import { allEvents } from "../util/cube";
import { Alg } from "cubing/alg";

export type EventID = keyof typeof allEvents;
export interface Solve {
	/**
	 * Unix timestamp of when the solve was started
	 */
	when: number;

	/**
	 * How long the solve was, in milliseconds
	 */
	duration: number;

	/**
	 * The event of the solve (e.g. "333" or "master_tetraminx")
	 */
	event: EventID;

	/**
	 * A string containing the scramble used
	 */
	scramble: string;
}

export const cubeTypeAtom = atom<EventID>("333");
// export const currentSolveAtom = atom<Solve | null>(null);
const baseCurrentScrambleAtom = atom<Promise<Alg> | null>(null);
export const scrambleAtom = atom(
	async (get) => {
		return get(baseCurrentScrambleAtom);
	},
	async (_get, set, event: EventID) => {
		const scramble = randomScrambleForEvent(event);
		set(baseCurrentScrambleAtom, scramble);
	}
);

export const timeStartedAtAtom = atom<Date | null>(null);
export const spaceTimerStartedAtom = atom(0);
export const inspectionTimerAtom = atom(0);
export const inInspectionAtom = atom(false);
export const canStartAtom = atom(false);
export const finalTimeAtom = atom<number>(0);

export const solvingAtom = atom(false);
export const plusTwoAtom = atom(false);

// useAtom(currentScrambleAtom)[0]