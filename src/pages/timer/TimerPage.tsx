import {
	Box,
	Option,
	Select,
	Skeleton,
	Stack,
	Typography,
} from "@mui/joy";
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
import { allEvents, placeholderScrambles } from "../../util/cube";
import Timer from "./Timer";
import { freezeTimeLengthAtom } from "../../state/settings";
import { currentSessionIdAtom, sessionsAtom } from "../../state/general";

export default function TimerPage() {
	const nextScramble = useSetAtom(scrambleAtom);
	const [cubeType, setCubeType] = useAtom(cubeTypeAtom);

	const freezeTimeLength = useAtomValue(freezeTimeLengthAtom);
	const [spaceTimerStarted, setSpaceTimerStarted] = useAtom(
		spaceTimerStartedAtom
	);
	const [canStart, setCanStart] = useAtom(canStartAtom);
	const [timeStartedAt, setTimeStartedAt] = useAtom(timeStartedAtAtom);
	const [solving, setSolving] = useAtom(solvingAtom);
	const [finalTime, setFinalTime] = useAtom(finalTimeAtom);
	const timeoutRef = useRef<number>(0);
	const down = useRef<boolean>(false);
	const sessions = useAtomValue(sessionsAtom);
	const [currentSessionId, setCurrentSessionId] = useAtom(currentSessionIdAtom);

	useEffect(() => {
		setCanStart(false);
	}, []);

	const downCallback = (event: KeyboardEvent | TouchEvent<HTMLDivElement>) => {
		if ("key" in event && event.key !== " ") {
			if (!solving) return;
		}
		// 	return;
		if (down.current === true) return;
		if ("key" in event && event.key === " ") down.current = true;
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
		if ("key" in event && event.key !== " ") return;
		if (down.current === false) return;
		down.current = false;
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
		<>
			{/* <GlobalStyles
				styles={{
					":root": {
						filter: solving ? "brightness(75%)" : "brightness(100%)",
						transition: "filter 250ms ease",
					},
				}}
			/> */}
			<Box
				onContextMenu={(event) => {
					event.preventDefault();
				}}
				sx={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
				onTouchStart={downCallback}
				onTouchEnd={upCallback}
			>
				<Stack
					direction={"row"}
					gap={"12px"}
					marginLeft={"12px"}
					marginTop="12px"
				>
					<Select
						value={cubeType}
						onChange={(_event, cube_type) => {
							setCubeType(cube_type || "333");
						}}
					>
						{Object.entries(allEvents).map(([event_id, event_obj], _i) => {
							return (
								<Option value={event_id} key={event_id}>
									{event_obj.eventName}
								</Option>
							);
						})}
					</Select>
					<Select
						value={currentSessionId}
						onChange={(_event, session_id) => {
							if (typeof session_id === "string")
								setCurrentSessionId(session_id);
						}}
					>
						{Object.entries(sessions).map(([session_id, session_obj], _i) => {
							return (
								<Option value={session_id} key={session_id}>
									{session_obj?.name}
								</Option>
							);
						})}
					</Select>
				</Stack>
				<Stack direction="column" width="100%" height="100%">
					<Box
						flex={"1"}
						textAlign={"center"}
						sx={{
							alignContent: "end",
							// marginTop: "25%",
							// marginBottom: "15%",
							width: "100%",
							justifyItems: "center",
						}}
					>
						<Typography
							marginLeft={"auto"}
							marginRight={"auto"}
							level="body-md"
							maxWidth={"500px"}
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
					<Box sx={(theme) => ({
						width: "100vw",
						height: "100vh",
						position: "fixed",
						pointerEvents: solving ? "all" : "none",
						background: theme.palette.background.popup,
						opacity: solving ? 0.60 : 0,
						transition: "opacity 200ms ease"
						// background: "red"
					})}/>
					{/* createPortal(<div style={{pointerEvents: "none", width: "100vw", height: "100vh", zIndex: "-1", background: "#ff000088", position: "fixed", marginTop: "-100vh"}}></div>, document.body)} */}
					<Box
						flex="1"
						textAlign={"center"}
						// flex="1"
						sx={{
							position: "relative",
							zIndex: "99",
							// "::backdrop": {
							// 	width: "100vw",
							// 	height: "100vh",
							// 	background: "red",
							// 	position: "absolute",
							// 	top: "0",
							// 	left: "0"
							// },
							transition: "filter 250ms ease",
							width: "100%",
							flexBasis: "calc(min(25cqw, 96px)*2)",
							// height: "100%",
							// marginBottom: "auto",
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
		</>
	);
}
