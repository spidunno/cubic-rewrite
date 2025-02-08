import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Link,
	List,
	ListDivider,
	ListItem,
	Modal,
	ModalDialog,
	Sheet,
	Stack,
	Typography,
} from "@mui/joy";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import { Link as RouterLink } from "react-router";
import ReactVirtualizedAutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from 'react-window';
import { Icon } from "../../components/Icon";
import { askBeforeDeleteAtom } from "../../state/settings";
import { solvesDb, sortedSolvesAtom } from "../../state/storage";
import { formatTime } from "../../util/timeFormatting";

export default function Solves() {
	const solveCount = useAtomValue(solvesDb.keys).length;

	return (
		<Box width={"100%"} height={"100%"} overflow={"hidden"} alignContent={solveCount === 0 ? "center" : "start"}>
			{solveCount === 0 ? (
				<Typography justifySelf={"center"} color="neutral" sx={{ userSelect: "none" }}>Nothing here yet...</Typography>
			) : (

				<ReactVirtualizedAutoSizer>
					{({ height, width }) =>
						<List>
							<FixedSizeList height={height} itemCount={solveCount} itemSize={50} width={width}>
								{({ index, style }) => <SolveDisplay index={index} style={style} />}
							</FixedSizeList>
						</List>

					}
				</ReactVirtualizedAutoSizer>
			)}
		</Box>
	);
}

function SolveDisplay({
	index,
	style
}: {
	index: number;
	style: React.CSSProperties;
}) {
	const sortedSolves = useAtomValue(sortedSolvesAtom);
	const solve = sortedSolves[index];
	const setSolves = useSetAtom(solvesDb.set);
	const deleteSolve = useSetAtom(solvesDb.delete);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const askBeforeDelete = useAtomValue(askBeforeDeleteAtom);

	return (
		<div style={style}>
			{index > 0 ? <ListDivider sx={{ marginBottom: '0px' }} /> : undefined}
			<ListItem sx={{ justifyContent: 'space-between' }}>
				<Sheet sx={{ background: 'inherit' }}>
					{" "}
					<Typography fontFamily={"Azeret Mono"} display={"inline"}>
						{sortedSolves.length - index}.
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
				<Sheet sx={{ textAlign: "start", background: 'inherit' }}>
					<Stack direction="row" width="100%" justifyContent={"end"} gap="6px">
						<Button
							onClick={() => {
								const newSolve = {
									...solve,
									plusTwo: !solve.plusTwo,
									time:
										solve.rawTime +
										(!solve.plusTwo ? 2000 : 0),
								};
								setSolves(newSolve.id, newSolve);
							}}
							sx={(theme) => ({
								color: solve.plusTwo
									? `rgba(${theme.palette.warning.mainChannel} / 1)`
									: undefined,
							})}
							color={solve.plusTwo ? "warning" : "neutral"}
							variant="plain"
						>
							+2
						</Button>
						<Button
							onClick={() => {
								const newSolve = {
									...solve,
									dnf: !solve.dnf,
								};
								setSolves(newSolve.id, newSolve);
							}}
							color={solve.dnf ? "danger" : "neutral"}
							sx={(theme) => ({
								color: solve.dnf
									? `rgba(${theme.palette.danger.mainChannel} / 1)`
									: undefined,
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
									const solve = sortedSolves[index]
									deleteSolve(solve.id);
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
						<DialogTitle sx={{ display: "block" }}>
							Delete this solve?
							{/* <br/> */}
							<Typography level="body-xs">
								<Link
									to="/settings/other#ask-before-delete"
									underline="always"
									color="neutral"
									component={RouterLink}
								>
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
									const solve = sortedSolves[index];
									deleteSolve(solve.id);
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
			</ListItem>
		</div>
	);
}
