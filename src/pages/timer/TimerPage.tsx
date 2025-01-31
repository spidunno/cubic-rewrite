import { Box, Skeleton, Stack, Typography } from "@mui/joy";
import Scramble from "./Scramble";
import { Suspense, useEffect, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
	canStartAtom,
	cubeTypeAtom,
	finalTimeAtom,
	scrambleAtom,
	solvingAtom,
	spaceTimerStartedAtom,
	timeStartedAtAtom,
} from "../../state/timer";
import { placeholderScrambles } from "../../util/cube";
import Timer from "./Timer";
import { freezeTimeLengthAtom } from "../../state/settings";

export default function TimerPage() {
	const nextScramble = useSetAtom(scrambleAtom);
	const cubeType = useAtomValue(cubeTypeAtom);

	const freezeTimeLength = useAtomValue(freezeTimeLengthAtom);
	const [spaceTimerStarted, setSpaceTimerStarted] = useAtom(
		spaceTimerStartedAtom
	);
	const [canStart, setCanStart] = useAtom(canStartAtom);
	const [timeStartedAt, setTimeStartedAt] = useAtom(timeStartedAtAtom);
	const [solving, setSolving] = useAtom(solvingAtom);
	const [finalTime, setFinalTime] = useAtom(finalTimeAtom);
	const timeoutRef = useRef<number>(0);

	useEffect(() => {
		setCanStart(false);
	}, []);

	useEffect(() => {
		console.log(freezeTimeLength);
		const keydownCallback = (event: KeyboardEvent) => {
			if (event.key !== " " || event.repeat) return;
			setCanStart(false);
			if (solving) {
				const endTime = Date.now();
				setFinalTime(endTime - (timeStartedAt?.valueOf() || 0));
				setSolving(false);
				setTimeStartedAt(null);
			} else {
				setSpaceTimerStarted(Date.now());
				timeoutRef.current = setTimeout(() => {
					setCanStart(true);
				}, freezeTimeLength);
			}
		};
		const keyupCallback = (event: KeyboardEvent) => {
			if (event.key !== " " || event.repeat) return;
			if (!canStart) {
				clearTimeout(timeoutRef.current);
			} else {
				setFinalTime(0);
				const startTime = new Date();
				setTimeStartedAt(startTime);
				setSolving(true);
				setCanStart(false);
			}
			setSpaceTimerStarted(0);
		};
		
		document.addEventListener("keydown", keydownCallback);
		document.addEventListener("keyup", keyupCallback);

		return () => {
			document.removeEventListener("keydown", keydownCallback);
			document.removeEventListener("keyup", keyupCallback);
		};
	}, [finalTime, timeStartedAt, solving, canStart, spaceTimerStarted]);

	// const setCurrentSolve = useSetAtom(currentSolveAtom);

	useEffect(() => {
		nextScramble(cubeType);
	}, [cubeType]);

	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<Stack direction="column" width="100%" height="100%">
				<Typography
					level="body-md"
					maxWidth={"450px"}
					textAlign={"justify"}
					sx={{ textAlignLast: "center" }}
				>
					<Suspense
						fallback={
							<Skeleton animation={"wave"} variant="inline">
								{placeholderScrambles[cubeType]}
							</Skeleton>
						}
					>
						<Scramble />
					</Suspense>
				</Typography>
				<Box
					textAlign={"center"}
					flex="1"
					sx={{
						width: "100%",
						containerType: "inline-size",
						containerName: "timer-text-container",
					}}
				>
					<Timer />
				</Box>
				{/* <svg viewBox="auto,auto,auto,auto">
					<text fill="white" textAnchor="start" alignmentBaseline="text-before-edge" x="0" y="0">Fit Me</text>
				</svg> */}
			</Stack>
		</Box>
	);
}
