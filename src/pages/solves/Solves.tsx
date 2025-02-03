import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Link,
	Modal,
	ModalDialog,
	Sheet,
	Stack,
	Table,
	Typography,
} from "@mui/joy";
import { solvesAtom } from "../../state/general";
import { useAtom, useAtomValue } from "jotai";
import { DatabaseSolve } from "../../state/storage";
import { formatTime } from "../../util/timeFormatting";
import { Icon } from "../../components/Icon";
import { useState } from "react";
import { askBeforeDeleteAtom } from "../../state/settings";
import { Link as RouterLink } from "react-router";

export default function Solves() {
	const [solves] = useAtom(solvesAtom);

	return (
		<Box width={"100%"} height={"100%"}>
			<Table>
				{/* <thead>
					<th>Solve Time</th>
					<th>Scramble</th>
				</thead> */}
				<tbody>
					{solves
						.map((v, i) => [i, v] as const)
						.sort((a, b) => {
							return a[1].createdAt - b[1].createdAt;
						})
						.reverse()
						.map((v, i, _a) => (
							<SolveDisplay
								index={i}
								solvesArrIndex={v[0]}
								solve={v[1]}
								key={v[1].id}
							/>
						))}
				</tbody>
			</Table>
		</Box>
	);
}

function SolveDisplay({
	solve,
	index,
	solvesArrIndex,
}: {
	solve: DatabaseSolve;
	index: number;
	solvesArrIndex: number;
}) {
	const [solves, setSolves] = useAtom(solvesAtom);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const askBeforeDelete = useAtomValue(askBeforeDeleteAtom);

	return (
		<tr>
			<Sheet component="td">
				{" "}
				<Typography fontFamily={"Azeret Mono"} display={"inline"}>
					{solves.length - index}.
				</Typography>
				<Typography
					display="inline"
					fontWeight={"bold"}
					sx={(theme) => ({
						marginLeft: "16px",
						color: solve.dnf
							? `rgba(${theme.palette.danger.mainChannel} / 1)`
							: solve.plusTwo
							? `rgba(${theme.palette.warning.mainChannel} / 1)`
							: `rgba(${theme.palette.success.mainChannel} / 1)`,
					})}
				>
					{solve.dnf ? "DNF" : formatTime(solve.time)}
				</Typography>{" "}
			</Sheet>
			{/* <td style={{ width: "100%", textWrap: "nowrap", overflowX: "scroll" }}>
				{solve.scramble}
			</td> */}
			<Sheet component="td" sx={{ textAlign: "start" }}>
				<Stack direction="row" width="100%" justifyContent={"end"} gap="6px">
					<Button
						onClick={() => {
							solves[solvesArrIndex] = {
								...solves[solvesArrIndex],
								plusTwo: !solves[solvesArrIndex].plusTwo,
								time:
									solves[solvesArrIndex].rawTime +
									(!solves[solvesArrIndex].plusTwo ? 2000 : 0),
							};
							setSolves([...solves]);
						}}
						sx={theme => ({
							color: solve.plusTwo ? `rgba(${theme.palette.warning.mainChannel} / 1)` : undefined
						})}
						color={solve.plusTwo ? "warning" : "neutral"}
						variant="plain"
					>
						+2
					</Button>
					<Button
						onClick={() => {
							solves[solvesArrIndex] = {
								...solves[solvesArrIndex],
								dnf: !solves[solvesArrIndex].dnf,
							};
							setSolves([...solves]);
						}}
						color={solve.dnf ? "danger" : "neutral"}
						sx={theme => ({
							color: solve.dnf ? `rgba(${theme.palette.danger.mainChannel} / 1)` : undefined
						})}
						variant="plain"
					>
						DNF
					</Button>
					<IconButton
						onClick={() => {
							if (askBeforeDelete) {
								setDeleteOpen(true);
							} else {
								setSolves([...solves].filter((_v, i) => i !== solvesArrIndex));
							}
						}}
						color="danger"
						variant="soft"
					>
						<Icon icon="close" />
					</IconButton>
				</Stack>
			</Sheet>
			<Modal
				open={deleteOpen}
				onClose={() => {
					setDeleteOpen(false);
				}}
			>
				<ModalDialog variant="outlined" role="alertdialog">
					<DialogTitle sx={{display: "block"}}>
						Delete this solve?
						{/* <br/> */}
						<Typography level="body-xs">
							<Link to="/settings/other#ask-before-delete" underline="always" color="neutral" component={RouterLink}>
								Don't want this? You can disable this popup here.
							</Link>
						</Typography>
					</DialogTitle>
					<Divider />
					<DialogContent>
						Are you sure you want to delete this solve? This action is
						irreversible!
					</DialogContent>
					<DialogActions>
						<Button
							variant="solid"
							color="danger"
							onClick={() => {
								setSolves([...solves].filter((_v, i) => i !== solvesArrIndex));
								setDeleteOpen(false);
							}}
						>
							Delete solve
						</Button>
						<Button
							variant="plain"
							color="neutral"
							onClick={() => setDeleteOpen(false)}
						>
							Cancel
						</Button>
					</DialogActions>
				</ModalDialog>
			</Modal>
		</tr>
	);
}
