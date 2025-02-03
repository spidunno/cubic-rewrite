import { Box, FormControl, FormHelperText, FormLabel } from "@mui/joy";
import { PropsWithChildren } from "react";

export function SettingsEntry({
	label,
	description,
	children,
}: PropsWithChildren<{ label?: string; description?: string }>) {
	// const isSmallScreen = !useMediaQuery("@media (max-width: 600px)");
	return (
		<FormControl
			// orientation={isSmallScreen ? "horizontal" : "vertical"}
			sx={{
				"@media (max-width: 600px)": {
					flexDirection: "column",
					gap: "12px",
				},
				flexDirection: "row",
				gap: "64px",
				justifyContent: "space-between",
				alignContent: "start",
				alignItems: "start",
			}}
		>
			<Box maxWidth={"20em"}>
				<FormLabel>{label}</FormLabel>
				<FormHelperText sx={{ mt: 0 }}>{description}</FormHelperText>
			</Box>
			{/* <Box sx={{ display: "inline"}}> */}
				{children}
			{/* </Box> */}
		</FormControl>
	);
}
