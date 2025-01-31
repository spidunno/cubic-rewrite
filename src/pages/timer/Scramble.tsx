import { Skeleton, Typography } from "@mui/joy";
import { useAtom } from "jotai";
import { Suspense, use, useEffect } from "react";
import { currentScrambleAtom } from "../../state/timer";

export default function Scramble() {
	const [scramble, nextScramble] = useAtom(currentScrambleAtom);
	useEffect(() => {
		nextScramble("333");
	}, []);
	// const scramble = use(scramblePromise);

	return (
		scramble?.toString()
		// <Suspense
		// 	fallback={
		// 		<Skeleton variant="overlay">
		// 			<Typography level="body-md">AAAAAAAAAAAAAAAAAAAa</Typography>
		// 		</Skeleton>
		// 	}
		// >
		// 	<Typography level="body-md">{scramble?.toString()}</Typography>
		// </Suspense>
	);
}
