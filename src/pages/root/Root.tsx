import {
	Outlet,
	To,
	useLocation,
	useMatch,
	useViewTransitionState,
} from "react-router";
import "@fontsource/inter/index.css";
import {
	Box,
	CssBaseline,
	CssVarsProvider,
	IconButton,
	Stack,
	Tooltip,
	Typography,
	useColorScheme,
} from "@mui/joy";
import NavButton from "./NavButton";
import { Icon } from "../../components/Icon";
import { MaterialSymbol } from "material-symbols";
import { sidebarCollapsedAtom } from "../../state/ui";
import { useAtom } from "jotai";
import { themeModeAtom } from "../../state/settings";
import { useEffect } from "react";
import "@fontsource/afacad/index.css";
import CubicLogo from "../../assets/logo.svg?react";

export default function Root() {
	const location = useLocation();
	const isTransitioning = useViewTransitionState(location);
	const ThemeUpdater = () => {
		const [themeMode] = useAtom(themeModeAtom);
		const { setMode } = useColorScheme();
		useEffect(() => {
			setMode(themeMode);
		}, [themeMode]);
		return null;
	};

	return (
		<CssVarsProvider>
			<ThemeUpdater />
			<CssBaseline />
			<Stack direction="column" width="100%" height="100%">
				<Topbar />
				<Stack direction={"row"} flex={"1"}>
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
							<Outlet />
						</div>
					</Box>
				</Stack>
			</Stack>
		</CssVarsProvider>
	);
}

function Topbar() {
	const [sidebarCollapsed, setSidebarCollapsed] = useAtom(sidebarCollapsedAtom);

	return (
		<Box
			sx={(theme) => ({
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				width: "100%",
				height: "64px",
				alignContent: "center",
				justifyContent: "start",
				paddingLeft: "10px",
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
				size="lg"
				onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
			>
				<Icon icon="menu" />
			</IconButton>
			<Stack
				direction="row"
				marginLeft={"auto"}
				marginRight="16px"
				alignItems={"center"}
			>
				<CubicLogo
					style={{
						// display: "inline-block",
						width: "40px",
						height: "40px",
					}}
					height={"44px"}
					width={"44px"}
				/>
				<Typography
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
					Cubic
				</Typography>
			</Stack>
		</Box>
	);
}

function Sidebar() {
	const matches = {
		"/": useMatch("/"),
		"/settings": useMatch("/settings"),
	};
	const [sidebarCollapsed, setSidebarCollapsed] = useAtom(sidebarCollapsedAtom);

	return (
		<Stack
			sx={(theme) => ({
				overflow: "hidden",
				backgroundColor: theme.palette.background.body,
				"@media (max-width: 600px)": {
					// display: sidebarCollapsed ? "none" : undefined,
					position: "absolute",
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
				<CubicLogo
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
						marginLeft: sidebarCollapsed ? "31px" : "12px",
						transition: "margin-left 150ms ease, letter-spacing 350ms ease",
						letterSpacing: sidebarCollapsed ? "0.5rem" : "normal",
						userSelect: "none",
					}}
					fontFamily={"Afacad"}
					fontSize={"32px"}
					fontWeight={"600"}
				>
					Cubic
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
				icon={<Icon icon={props.icon} filled={props.active} />}
			>
				{props.title}
			</NavButton>
		</Tooltip>
	);
}
