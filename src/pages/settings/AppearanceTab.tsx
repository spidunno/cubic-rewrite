import { useAtom } from "jotai";
import { SettingsEntry } from "./SettingsEntry";
import { Option, Select } from "@mui/joy";
import { colorSchemeAtom } from "../../state/settings";

export function AppearanceTab() {
	const [themeMode, setThemeMode] = useAtom(colorSchemeAtom);

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
