import { useAtomValue } from "jotai";
import { scrambleAtom } from "../../state/timer";

export default function Scramble() {
	const scramble = useAtomValue(scrambleAtom);
	// const scramble = use(scramblePromise);

	return scramble?.toString();
}