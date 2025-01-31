import { Box } from "@mui/joy";
import Scramble from "./Scramble";
import { Suspense } from "react";

export default function Timer() {
	return (
		<Box>
			<Suspense>
				<Scramble />
			</Suspense>
		</Box>
	);
}
