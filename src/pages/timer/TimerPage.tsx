import { Box, Skeleton, Stack, Typography } from "@mui/joy";
import Scramble from "./Scramble";
import { Suspense, TouchEvent, useEffect, useRef } from "react";
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

	const downCallback = (event: KeyboardEvent | TouchEvent<HTMLDivElement>) => {
		if (event instanceof KeyboardEvent && (event.key !== " " || event.repeat))
			return;
		setCanStart(false);
		if (solving) {
			const endTime = Date.now();
			setFinalTime(endTime - (timeStartedAt?.valueOf() || 0));
			setSolving(false);
			setTimeStartedAt(null);
			nextScramble(cubeType);
		} else {
			setSpaceTimerStarted(Date.now());
			timeoutRef.current = setTimeout(() => {
				setCanStart(true);
			}, freezeTimeLength);
		}
	};
	const upCallback = (event: KeyboardEvent | TouchEvent<HTMLDivElement>) => {
		if (event instanceof KeyboardEvent && (event.key !== " " || event.repeat))
			return;
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

	useEffect(() => {

		document.addEventListener("keydown", downCallback);
		document.addEventListener("keyup", upCallback);

		// document.addEventListener("touchstart", downCallback);
		// document.addEventListener("touchend", upCallback);

		// document.addEventListener("contextmenu", contextMenuCallback);

		return () => {
			document.removeEventListener("keydown", downCallback);
			document.removeEventListener("keyup", upCallback);

			// document.removeEventListener("touchstart", downCallback);
			// document.removeEventListener("touchend", upCallback);
		};
	}, [finalTime, timeStartedAt, solving, canStart, spaceTimerStarted]);

	// const setCurrentSolve = useSetAtom(currentSolveAtom);

	useEffect(() => {
		nextScramble(cubeType);
	}, [cubeType]);

	return (
		<Box
			onContextMenu={(event) => {
				event.preventDefault();
			}}
			sx={{ width: "100%", height: "100%" }}
			onTouchStart={downCallback}
			onTouchEnd={upCallback}
		>
			<Stack direction="column" width="100%" height="100%">
				<Box
					textAlign={"center"}
					sx={{
						marginTop: "auto",
						// marginBottom: "15%",
						width: "100%",
						justifyItems: "center",
					}}
				>
					<Typography
						marginLeft={"auto"}
						marginRight={"auto"}
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
				</Box>
				<Box
					textAlign={"center"}
					// flex="1"
					sx={{
						width: "100%",
						marginBottom: "auto",
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
