import {
	Box,
	Link,
	Option,
	Select,
	Skeleton,
	Stack,
	Typography,
} from "@mui/joy";
import Scramble from "./Scramble";
import {
	Suspense,
	TouchEvent as ReactTouchEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
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
import {
	currentSessionIdAtom,
} from "../../state/general";
import { DatabaseSolve, sessionsDb, solvesDb } from "../../state/storage";
import { nanoid } from "nanoid";
import { Alg } from "cubing/alg";
import { footerOpenAtom } from "../../state/ui";
import Solves from "../solves/Solves";
import { freezeTimeLengthAtom } from "../../state/settings";

export default function TimerPage() {
	const [scramble, setScramble] = useState<Alg | null>(null);
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
	const sessions = useAtomValue(sessionsDb.values)
	const [currentSessionId, setCurrentSessionId] = useAtom(currentSessionIdAtom);
	const setSolve = useSetAtom(solvesDb.set);

	// const isSmallScreen = useMediaQuery("(max-width: 600px)");
	const [footerOpen, _setFooterOpen] = useAtom(footerOpenAtom);

	useEffect(() => {
		setCanStart(false);
	}, [setCanStart]);

	const startSolve = useCallback(() => {
		setFinalTime(0);
		const startTime = new Date();
		setTimeStartedAt(startTime);
		setSolving(true);
		setCanStart(false);
	}, [setCanStart, setFinalTime, setSolving, setTimeStartedAt]);
	const endSolve = useCallback(() => {
		const endTime = Date.now();
		const endScramble = scramble?.toString();
		const duration = endTime - (timeStartedAt?.valueOf() || 0);
		const solve: DatabaseSolve = {
			cube_type: cubeType,
			dnf: false,
			createdAt: timeStartedAt?.valueOf() || 0,
			endedAt: endTime,
			id: nanoid(),
			plusTwo: false,
			rawTime: duration,
			scramble: endScramble?.toString() || "",
			sessionId: currentSessionId || "default",
			time: duration,
		};
		setSolve(solve.id, solve);

		setFinalTime(duration);
		setSolving(false);
		setTimeStartedAt(null);
		nextScramble(cubeType);
	}, [scramble, timeStartedAt, cubeType, currentSessionId, setSolve, setFinalTime, setSolving, setTimeStartedAt, nextScramble]);

	const downCallback = useCallback((
		event: KeyboardEvent | ReactTouchEvent<HTMLDivElement>
	) => {
		// if (!("key" in event) && event.nativeEvent instanceof TouchEvent) event.preventDefault();
		if ("key" in event && event.key !== " ") {
			if (!solving) return;
		}
		if (down.current === true) return;
		down.current = true;
		setCanStart(false);
		if (solving) {
			endSolve();
		} else {
			setSpaceTimerStarted(Date.now());
			timeoutRef.current = setTimeout(() => {
				setCanStart(true);
			}, freezeTimeLength);
		}
	}, [endSolve, freezeTimeLength, setCanStart, setSpaceTimerStarted, solving]);
	const upCallback = useCallback((
		event: KeyboardEvent | ReactTouchEvent<HTMLDivElement>
	) => {
		// if (!("key" in event) && event.nativeEvent instanceof TouchEvent) event.preventDefault();
		if ("key" in event && event.key !== " ") return;
		if (down.current === false) return;
		down.current = false;
		if (!canStart) {
			clearTimeout(timeoutRef.current);
		} else {
			startSolve();
		}
		setSpaceTimerStarted(0);
	}, [canStart, setSpaceTimerStarted, startSolve]);

	useEffect(() => {
		document.addEventListener("keydown", downCallback);
		document.addEventListener("keyup", upCallback);

		return () => {
			document.removeEventListener("keydown", downCallback);
			document.removeEventListener("keyup", upCallback);
		};
	}, [finalTime, timeStartedAt, solving, canStart, spaceTimerStarted, downCallback, upCallback]);

	return (
		<>
			<Stack
				sx={{
					width: "100%",
					height: "100%",
				}}
				direction={"column"}
			>
				<Box
					onContextMenu={(event) => {
						event.preventDefault();
					}}
					sx={{
						userSelect: "none",
						width: "100%",
						height: "100%",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Box
						sx={{
							width: "100%",
							maxHeight: "100%",
							flex: "1",
							display: "flex",
							flexDirection: "column",
						}}
						onTouchStart={downCallback}
						onTouchEnd={upCallback}
					>
						<Stack
							onTouchStart={(event) => event.stopPropagation()}
							onTouchEnd={(event) => event.stopPropagation()}
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
								{Object.entries(sessions).map(
									([session_id, session_obj], _i) => {
										return (
											<Option value={session_id} key={session_id}>
												{session_obj?.name}
											</Option>
										);
									}
								)}
							</Select>
						</Stack>
						<Box
							flex={"1"}
							textAlign={"center"}
							sx={{
								alignContent: "end",
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
									{/* {scramble?.toString()} */}
									<Scramble onScrambleLoaded={(s) => setScramble(s)} />
								</Suspense>
							</Typography>
						</Box>
						<Box
							sx={(theme) => ({
								zIndex: "100",
								width: "100%",
								height: "100%",
								position: "fixed",
								pointerEvents: solving ? "all" : "none",
								background: theme.palette.background.popup,
								opacity: solving ? 0.6 : 0,
								transition: "opacity 200ms ease",
							})}
						/>
						<Box
							flex="1"
							textAlign={"center"}
							sx={{
								position: "relative",
								zIndex: "101",
								transition: "filter 250ms ease",
								width: "100%",
								flexBasis: "calc(min(25cqw, 96px)*2)",
								containerType: "inline-size",
								containerName: "timer-text-container",
							}}
						>
							<Timer />
						</Box>
					</Box>
					<Stack
						// marginBottom={
						// 	isSmallScreen ? (footerOpen ? "0px" : "-500px") : "0px"
						// }
						marginBottom={footerOpen ? "0px" : "-500px"}
						direction={"column"}
						position={"relative"}
						// height={"100%"}
						maxHeight="350px"
						flex={"1"}
						gap={"0"}
					>
						<Link
							onClick={() => _setFooterOpen(!footerOpen)}
							color="neutral"
							sx={{
								// display: "none",
								// "@media (max-width: 600px)": {
								display: "inline",
								// },
								position: "absolute",
								zIndex: 300,
								top: "-2em",
								right: "12px",
								userSelect: "none",
							}}
						>
							{footerOpen ? "Hide Footer" : "Show Footer"}
						</Link>

						<Box
							borderTop={(theme) =>
								`1px solid ${theme.palette.neutral.outlinedBorder}`
							}
							// height={"325px"}
							// maxHeight="350px"
							// minHeight={"500px"}
							sx={{ overflowY: "auto", scrollbarGutter: "stable" }}
						>
							<Solves />
						</Box>
					</Stack>
				</Box>
			</Stack>
		</>
	);
}
