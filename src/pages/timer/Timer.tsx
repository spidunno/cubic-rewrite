import { Typography } from "@mui/joy";
import { useAtom, useAtomValue } from "jotai";
import { canStartAtom, finalTimeAtom, Solve, solvingAtom, spaceTimerStartedAtom, timeStartedAtAtom } from "../../state/timer";
import { useCallback, useEffect, useRef, useState } from "react";
import { formatTime } from "../../util/timeFormatting";
import { freezeTimeLengthAtom } from "../../state/settings";

interface TimerProps {
	// solve?: Solve;
}

export default function Timer(props: TimerProps) {
	const timeStartedAt = useAtomValue(timeStartedAtAtom);
	const finalTime = useAtomValue(finalTimeAtom);
	const [timerText, setTimerText] = useState("");
	const spaceTimerStarted = useAtomValue(spaceTimerStartedAtom);
	const freezeTimeLength = useAtomValue(freezeTimeLengthAtom);
	const solving = useAtomValue(solvingAtom);
	const canStart = useAtomValue(canStartAtom);
	const textRef = useRef<HTMLDivElement>(null);
	const animationFrameRef = useRef<number>(-1);
	const frameCallback = (time: number) => {
		// if (textRef.current) {
			const currentVal =
				solving ? Date.now() - (timeStartedAt?.valueOf() || 0)
					: finalTime;
			setTimerText(formatTime(currentVal));
		// }
		animationFrameRef.current = requestAnimationFrame(frameCallback);
	};

	useEffect(() => {
		animationFrameRef.current = requestAnimationFrame(frameCallback);

		return () => {
			cancelAnimationFrame(animationFrameRef.current);
		};
	}, [timeStartedAt, finalTime, solving]);

	return (
		<Typography
			color={spaceTimerStarted !== 0 ? (
				canStart ? 'success' : 'warning'
			) : undefined}
			component={"div"}
			fontFamily={"Azeret Mono"}
			sx={{
				transition: "color 50ms ease",
				userSelect: "none",
				fontSize: "min(25cqw, 96px)",
			}}
			ref={textRef}
		>
			{timerText}
		</Typography>
	);
}
