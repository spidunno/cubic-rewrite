import {
	Outlet,
	To,
	useLocation,
	useMatch,
	useViewTransitionState,
} from "react-router";
import {
	Box,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from "@mui/joy";
import NavButton from "./NavButton";
import { Icon } from "../../components/Icon";
import { sidebarCollapsedAtom } from "../../state/ui";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
// import { ErrorBoundary } from "react-error-boundary";

import type { MaterialSymbol } from "material-symbols";

import "@fontsource/inter/index.css";
import "@fontsource/afacad/index.css";
import "@fontsource/azeret-mono/index.css";

import QbqLogo from "../../assets/logo.svg?react";
import { _storageDb } from "../../state/storage";
import { cubeTypeAtom, scrambleAtom } from "../../state/timer";

export default function Root() {
	useAtomValue(_storageDb.suspendBeforeInit);
	const nextScramble = useSetAtom(scrambleAtom);
	const cubeType = useAtomValue(cubeTypeAtom);
	const location = useLocation();
	const isTransitioning = useViewTransitionState(location);
	// const [mobileSidebarCollapsed, setMobileSidebarCollapsed] = useState(true);
	useEffect(() => {
		nextScramble(cubeType);
	}, [cubeType]);

	return (

			<Stack direction="column" width="100%" height="100vh">
				<Topbar/>
				<Stack direction={"row"} flex={"1"} height="100%">
					<MobileSidebar/>
					<Sidebar />
					<Box sx={{ height: "100%" }} flex={"1"}>
						<div
							className={"main-content"}
							style={{
								viewTransitionName: isTransitioning
									? "main-content"
									: undefined,
							}}
						>
							{/* <ErrorBoundary fallback={<>test</>}> */}
								<Outlet />
							{/* </ErrorBoundary> */}
						</div>
					</Box>
				</Stack>
			</Stack>
	);
}

function Topbar() {
	const [sidebarCollapsed, setSidebarCollapsed] = useAtom(mobileSidebarCollapsedAtom);

	return (
		<Box
			sx={(theme) => ({
				zIndex: "800",
				position: "relative",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				width: "100%",
				height: "64px",
				minHeight: "64px",
				alignContent: "center",
				justifyContent: "space-between",
				paddingLeft: "10px",
				paddingRight: "10px",
				borderBottom: `1px solid ${theme.palette.neutral.outlinedBorder}`,
				viewTransitionName: "topbar",
				transition: "margin-top 150ms ease, visibility 150ms linear",
				marginTop: "-64px",
				visibility: "hidden",
				"@media (max-width: 600px)": {
					marginTop: "0",
					visibility: "visible",
				},
			})}
		>
			<IconButton
				sx={{}}
				size="lg"
				onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
			>
				<Icon icon="menu" />
			</IconButton>
			{/* <Stack
				direction="row"
				// marginLeft={"auto"}
				alignSelf={"center"}
				// marginRight="auto"
				alignItems={"center"}
			> */}
			<QbqLogo
				style={{
					// position: 'absolute',
					// left: "50%",
					// right: "50%",
					// marginLeft: "auto",
					// marginRight: "",
					alignSelf: "center",
					// display: "inline-block",
					width: "40px",
					height: "40px",
				}}
				height={"44px"}
				width={"44px"}
			/>
			<Box width={"44px"} height={"44px"}></Box>
			{/* <Typography
					component={"div"}
					sx={{
						// display: "inline-block1",
						marginLeft: "12px",
						// transition: "margin-left 150ms ease",
						userSelect: "none",
					}}
					fontFamily={"Afacad"}
					fontSize={"30px"}
					fontWeight={"600"}
				>
					qbq
				</Typography> */}
			{/* </Stack> */}
		</Box>
	);
}

function Sidebar() {
	const matches = {
		"/": useMatch("/"),
		"/solves": useMatch("/solves"),
		"/sessions": useMatch("/sessions"),
		"/settings": useMatch("/settings/*"),
	};
	const [sidebarCollapsed, setSidebarCollapsed] = useAtom(sidebarCollapsedAtom);

	return (
		<Stack
			sx={(theme) => ({
				zIndex: "800",
				overflow: "hidden",
				backgroundColor: theme.palette.background.body,
				"@media (max-width: 600px)": {
					// display: sidebarCollapsed ? "none" : undefined,
					position: "absolute",
					display: "none",
					zIndex: "1000",
					transition: "width 150ms linear, margin-left 250ms ease",

					// width: "240px",
					marginLeft: sidebarCollapsed ? "-240px" : "0",
					height: `calc(100% - 64px)`,
				},
				viewTransitionName: "sidebar",

				width: sidebarCollapsed ? "96px" : "240px",
				transition: "width 150ms ease, margin-left 150ms ease",
				borderRight: `1px solid ${theme.palette.neutral.outlinedBorder}`,
				height: `100%`,
				// flex: "1",
				padding: "26px",
			})}
			direction="column"
			alignItems="stretch"
			justifyItems={"center"}
		>
			<IconButton
				sx={{
					// maxWidth: "44px",
					// alignContent: "right",
					justifyContent: "right",
					marginBottom: "26px",
					"@media (max-width: 600px)": { display: "none" },
				}}
				size="lg"
				onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
			>
				<Icon
					style={{ rotate: sidebarCollapsed ? "0deg" : "180deg" }}
					icon="chevron_right"
				/>
			</IconButton>
			<Stack
				direction={"column"}
				justifyItems={"center"}
				alignItems={"stretch"}
				width={"100%"}
				spacing={"8px"}
				// padding={"26px"}
			>
				<SidebarButton
					icon="timer"
					active={!!matches["/"]}
					title="Timer"
					to="/"
					iconButton={sidebarCollapsed}
				/>
				<SidebarButton
					icon="list_alt"
					active={!!matches["/solves"]}
					title="Solves"
					to="/solves"
					iconButton={sidebarCollapsed}
				/>
				<SidebarButton
					icon="view_stream"
					active={!!matches["/sessions"]}
					title="Sessions"
					to="/sessions"
					iconButton={sidebarCollapsed}
				/>
				<SidebarButton
					icon="settings"
					active={!!matches["/settings"]}
					title="Settings"
					to="/settings"
					iconButton={sidebarCollapsed}
				/>
			</Stack>
			<Box
				sx={{
					marginTop: "auto",
					width: "188px",
					height: "44px",
					// display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					display: "flex",
					"@media (max-width: 600px)": {
						// display: "none"
						visibility: "hidden",
					},
				}}
			>
				<QbqLogo
					style={{
						display: "inline-block",
						width: "44px",
						height: "44px",
						minWidth: "44px",
						minHeight: "44px",
					}}
					height={"44px"}
					width={"44px"}
				/>
				<Typography
					component={"div"}
					sx={{
						marginLeft: sidebarCollapsed ? "44px" : "12px",
						transition: "margin-left 200ms ease, letter-spacing 300ms ease",
						letterSpacing: sidebarCollapsed ? "1rem" : "normal",
						userSelect: "none",
					}}
					fontFamily={"Afacad"}
					fontSize={"32px"}
					fontWeight={"600"}
				>
					qbq
				</Typography>
			</Box>
		</Stack>
	);
}

function MobileSidebar() {
	const [sidebarCollapsed, _setSidebarCollapsed] = useAtom(mobileSidebarCollapsedAtom)
	const matches = {
		"/": useMatch("/"),
		"/solves": useMatch("/solves"),
		"/sessions": useMatch("/sessions"),
		"/settings": useMatch("/settings/*"),
	};

	return (
		<Stack
			sx={(theme) => ({
				zIndex: "800",
				display: "none",
				overflow: "hidden",
				backgroundColor: theme.palette.background.body,
				"@media (max-width: 600px)": {
					display: "block",
					// display: sidebarCollapsed ? "none" : undefined,
					position: "absolute",
					zIndex: "1000",
					transition: "width 150ms linear, margin-left 250ms ease",

					// width: "240px",
					marginLeft: sidebarCollapsed ? "-240px" : "0",
					height: `calc(100% - 64px)`,
				},
				viewTransitionName: "mobile-sidebar",

				width: sidebarCollapsed ? "96px" : "240px",
				transition: "width 150ms ease, margin-left 150ms ease",
				borderRight: `1px solid ${theme.palette.neutral.outlinedBorder}`,
				height: `100%`,
				// flex: "1",
				padding: "26px",
			})}
			direction="column"
			alignItems="stretch"
			justifyItems={"center"}
		>
			<Stack
				direction={"column"}
				justifyItems={"center"}
				alignItems={"stretch"}
				width={"100%"}
				spacing={"8px"}
				// padding={"26px"}
			>
				<SidebarButton
					icon="timer"
					active={!!matches["/"]}
					title="Timer"
					to="/"
					iconButton={sidebarCollapsed}
				/>
				<SidebarButton
					icon="list_alt"
					active={!!matches["/solves"]}
					title="Solves"
					to="/solves"
					iconButton={sidebarCollapsed}
				/>
				<SidebarButton
					icon="view_stream"
					active={!!matches["/sessions"]}
					title="Sessions"
					to="/sessions"
					iconButton={sidebarCollapsed}
				/>
				<SidebarButton
					icon="settings"
					active={!!matches["/settings"]}
					title="Settings"
					to="/settings"
					iconButton={sidebarCollapsed}
				/>
			</Stack>
			<Box
				sx={{
					marginTop: "auto",
					width: "188px",
					height: "44px",
					// display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					display: "flex",
					"@media (max-width: 600px)": {
						// display: "none"
						visibility: "hidden",
					},
				}}
			>
				<QbqLogo
					style={{
						display: "inline-block",
						width: "44px",
						height: "44px",
						minWidth: "44px",
						minHeight: "44px",
					}}
					height={"44px"}
					width={"44px"}
				/>
				<Typography
					component={"div"}
					sx={{
						marginLeft: sidebarCollapsed ? "44px" : "12px",
						transition: "margin-left 200ms ease, letter-spacing 300ms ease",
						letterSpacing: sidebarCollapsed ? "1rem" : "normal",
						userSelect: "none",
					}}
					fontFamily={"Afacad"}
					fontSize={"32px"}
					fontWeight={"600"}
				>
					qbq
				</Typography>
			</Box>
		</Stack>
	);
}

function SidebarButton(props: {
	icon: MaterialSymbol;
	title: string;
	active?: boolean;
	to: To;
	iconButton?: boolean;
}) {
	const setMobileSidebarCollapsed = useSetAtom(mobileSidebarCollapsedAtom)
	return (
		<Tooltip
			title={props.title}
			sx={{ display: props.iconButton ? undefined : "none" }}
			variant="soft"
			placement="right"
			disableInteractive
		>
			<NavButton
				viewTransition
				size="lg"
				iconButton={props.iconButton}
				variant={props.active ? "soft" : "plain"}
				color="primary"
				to={props.to}
				onClick={() => {
					setMobileSidebarCollapsed(true);
				}}
				icon={<Icon icon={props.icon} filled={props.active} />}
			>
				{props.title}
			</NavButton>
		</Tooltip>
	);
}

export const mobileSidebarCollapsedAtom = atom(true);