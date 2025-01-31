export interface FormatTimeConfig {
	digits: number;
}

export function formatTime(time: number, config: FormatTimeConfig = {digits: 2}) {
	const timeInSeconds = time / 1000;
	const timeMod60 = timeInSeconds % 60;
	const minutes = Math.floor(timeInSeconds / 60);
	// const secondsOfTime = Math.floor(timeInSeconds % 60);
	// const msOfTime = Math.floor(time % 1000)
	if (timeInSeconds < 60) {
		return `${timeMod60.toFixed(config.digits)}`
	} else {
		return `${minutes}:${timeMod60.toFixed(config.digits).padStart(config.digits + 3, "0")}`
	}
}