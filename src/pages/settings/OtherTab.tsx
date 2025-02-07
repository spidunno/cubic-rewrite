import { useAtom } from "jotai";
import {
	askBeforeDeleteAtom,
	defaultFreezeTimeLength,
	freezeTimeLengthAtom,
} from "../../state/settings";
import { SettingsEntry } from "./SettingsEntry";
import { Divider, IconButton, Input, Switch, Tooltip } from "@mui/joy";
import { Icon } from "../../components/Icon";

export function OtherTab() {
	const [freezeTimeLength, setFreezeTimeLength] = useAtom(freezeTimeLengthAtom);
	const [askBeforeDelete, setAskBeforeDelete] = useAtom(askBeforeDeleteAtom);

	return (
		<>
			<SettingsEntry
				label={`Time Start Delay`}
				description={`Amount of time in seconds the space bar must be held before the timer can start.`}
			>
				<Input
					id="time-start-delay"
					type="number"
					slotProps={{
						input: {
							step: 0.1
						}
					}}
					value={(freezeTimeLength || defaultFreezeTimeLength) / 1000}
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
							setFreezeTimeLength(freezeTimeLength || defaultFreezeTimeLength);
						}
					}}
				/>
			</SettingsEntry>
			<SettingsEntry
				label="Ask Before Delete"
				description="Whether or not to confirm that you want to delete a solve first when pressing the delete button."
			>
				<Switch
					sx={{
						alignSelf: "start"
					}}
					size="lg"
					id="ask-before-delete"
					onChange={(event) => setAskBeforeDelete(event.target.checked)}
					checked={askBeforeDelete}
					color={askBeforeDelete ? "primary" : "neutral"}
					variant={askBeforeDelete ? "solid" : "outlined"}
					endDecorator={askBeforeDelete ? "On" : "Off"}
				/>
			</SettingsEntry>
		</>
	);
}
