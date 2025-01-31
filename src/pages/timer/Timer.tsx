import { Typography } from "@mui/joy";
import { useAtomValue } from "jotai";
import { canStartAtom, finalTimeAtom, solvingAtom, spaceTimerStartedAtom, timeStartedAtAtom } from "../../state/timer";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../util/timeFormatting";

export default function Timer() {
	const timeStartedAt = useAtomValue(timeStartedAtAtom);
	const finalTime = useAtomValue(finalTimeAtom);
	const [timerText, setTimerText] = useState("");
	const spaceTimerStarted = useAtomValue(spaceTimerStartedAtom);
	const solving = useAtomValue(solvingAtom);
	const canStart = useAtomValue(canStartAtom);
	const textRef = useRef<HTMLDivElement>(null);
	const animationFrameRef = useRef<number>(-1);
	const frameCallback = (_time: number) => {
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
