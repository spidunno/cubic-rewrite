import { atom, useAtom } from "jotai";

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

export const currentEventAtom = atom<EventID>("333");

export const currentSolveAtom = atom<Solve | null>(null);
const baseCurrentScrambleAtom = atom<Promise<Alg> | null>(null);
export const currentScrambleAtom = atom(
	async (get) => {
		return get(baseCurrentScrambleAtom);
	},
	async (get, set, event: EventID) => {
		const scramble = randomScrambleForEvent(event);
		set(baseCurrentScrambleAtom, scramble);
	}
);

// useAtom(currentScrambleAtom)[0]