import { useAtom } from "jotai";
import { themeModeAtom } from "../../state/settings";
import { SettingsEntry } from "./SettingsEntry";
import { Option, Select } from "@mui/joy";

export function AppearanceTab() {
	const [themeMode, setThemeMode] = useAtom(themeModeAtom);

	return (
		<SettingsEntry
			label={`Color Scheme`}
			description={`Choose "System" to automatically adjust the color scheme based on your OS theme.`}
		>
			<Select
				id="color-scheme"
				value={themeMode}
				onChange={(_event, value) => setThemeMode(value || "system")}
			>
				<Option value="system">System</Option>
				<Option value="dark">Dark</Option>
				<Option value="light">Light</Option>
			</Select>
		</SettingsEntry>
	);
}
