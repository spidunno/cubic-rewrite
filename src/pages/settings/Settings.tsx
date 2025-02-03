import {
	Box,
	Divider,
	FormControl,
	FormHelperText,
	FormLabel,
	IconButton,
	Input,
	Option,
	Select,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	Tooltip,
} from "@mui/joy";
import { useState } from "react";
// import "view-transitions-polyfill";
import { freezeTimeLengthAtom, themeModeAtom } from "../../state/settings";
import { useAtom } from "jotai";
import { Icon } from "../../components/Icon";
import { defaultFreezeTimeLength } from "../../state/storage";

export default function Settings() {
	const [currentTab, setCurrentTab] = useState("appearance");
	const [themeMode, setThemeMode] = useAtom(themeModeAtom);
	const [freezeTimeLength, setFreezeTimeLength] = useAtom(freezeTimeLengthAtom);

	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<Tabs
				sx={{
					backgroundColor: "transparent",
					// minHeight: "100%",
					height: "100%",
					maxHeight: "100%",
				}}
				// variant="outlined"
				onChange={(_event, value) => {
					// if (document.startViewTransition) {
					// document.startViewTransition(() => {
					// setCurrentTab(value?.toString() || "appearance");
					// });
					// } else {
					setCurrentTab(value?.toString() || "appearance");
					// }
				}}
				aria-label="Settings tabs"
				value={currentTab}
			>
				<TabList
				// sx={{ "--variant-plainActiveBg": "transparent" }}
				>
					<Tab value={"appearance"}>Appearance</Tab>
					<Tab value={"other"}>Other</Tab>
				</TabList>
				<Box
					sx={{
						"& > .MuiTabPanel-root": {
							minHeight: "fit-content",
							paddingBottom: "0",
						},
						"@media (max-width: 600px)": {
							height: "calc(100% - 103px)",
							maxHeight: "calc(100% - 103px)",
						},
						height: "calc(100%)",
						maxHeight: "calc(100%)",
						overflowY: "auto",
						scrollbarGutter: "stable",
					}}
				>
					<TabPanel value={"appearance"}>
						<FormControl>
							<FormLabel>Color Scheme</FormLabel>
							<Select
								value={themeMode}
								onChange={(_event, value) => setThemeMode(value || "system")}
							>
								<Option value="system">System</Option>
								<Option value="dark">Dark</Option>
								<Option value="light">Light</Option>
							</Select>
							<FormHelperText>
								Choose "System" to automatically adjust the color scheme based
								on your OS theme.
							</FormHelperText>
						</FormControl>
					</TabPanel>
					<TabPanel value={"other"}>
						<FormControl>
							<FormLabel>Time Start Delay</FormLabel>
							<Input
								type="number"
								value={freezeTimeLength / 1000}
								startDecorator={
									<>
										<Tooltip variant="soft" title="Reset to Default">
											<IconButton
												onClick={() => {
													setFreezeTimeLength(defaultFreezeTimeLength);
												}}
											>
												<Icon icon="refresh" sx={{ transform: "scaleX(-1)" }} />
											</IconButton>
										</Tooltip>
										<Divider
											orientation="vertical"
											sx={{ marginLeft: "3px", marginRight: "3px" }}
										/>
									</>
								}
								onChange={(event) => {
									const value = event.target.valueAsNumber;
									if (!Number.isNaN(value)) {
										setFreezeTimeLength(value * 1000);
									} else {
										setFreezeTimeLength(freezeTimeLength);
									}
								}}
							/>
							<FormHelperText>
								Amount of time in seconds the space bar must be held before the
								timer can start.
							</FormHelperText>
						</FormControl>
					</TabPanel>
				</Box>
			</Tabs>
		</Box>
	);
}
