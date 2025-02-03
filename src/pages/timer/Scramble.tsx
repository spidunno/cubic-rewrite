import { useAtomValue } from "jotai";
import { scrambleAtom } from "../../state/timer";
import { Alg } from "cubing/alg";
import { useEffect } from "react";

export default function Scramble(props: {onScrambleLoaded?: (scramble: Alg | null) => void}) {
	const scramble = useAtomValue(scrambleAtom);
	// const scramble = use(scramblePromise);
	useEffect(() => {
		if(props.onScrambleLoaded) props.onScrambleLoaded(scramble);
	}, [scramble]);
	return scramble?.toString();
}