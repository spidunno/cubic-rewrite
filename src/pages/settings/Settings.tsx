import { Box, Option, Select, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import { useState } from "react";
import 'view-transitions-polyfill';
import { themeModeAtom } from "../../state/settings";
import { useAtom } from "jotai";

export default function Settings() {
	const [ currentTab, setCurrentTab ] = useState("appearance");
	const [themeMode, setThemeMode] = useAtom(themeModeAtom);

	return <Box sx={{width: '100%', height: '100%'}}>
		<Tabs onChange={(_event, value) => {
			document.startViewTransition(() => {
				setCurrentTab(value?.toString() || "appearance");
			});
		}} aria-label="Settings tabs" value={currentTab}>
			<TabList>
				<Tab value={"appearance"}>Appearance</Tab>
				<Tab value={"other"}>Other</Tab>
			</TabList>
			<TabPanel value={"appearance"}>
				<Select value={themeMode} onChange={(_event, value) => setThemeMode(value || "system")}>
					<Option value="system">System</Option>
					<Option value="dark">Dark</Option>
					<Option value="light">Light</Option>
				</Select>
			</TabPanel>
			<TabPanel value={"other"}>
				Second panel
			</TabPanel>
		</Tabs>
	</Box>
}