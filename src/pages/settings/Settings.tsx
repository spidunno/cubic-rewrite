import {
	Box,
	Stack,
	Tab,
	TabList,
	Tabs,
} from "@mui/joy";
// import "view-transitions-polyfill";
import {
	Outlet,
	redirect,
	RouteObject,
	useLocation,
	useNavigate,
} from "react-router";
import { useEffect } from "react";
import { AppearanceTab } from "./AppearanceTab";
import { OtherTab } from "./OtherTab";

export default function Settings() {
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = location.pathname;
	useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the '#' character from the hash
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
				element.focus();
      }
    }
  }, []);
	// const [themeMode, setThemeMode] = useAtom(themeModeAtom);
	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Tabs
				sx={{
					backgroundColor: "transparent",
					// minHeight: "100%",
					// height: "100%",
					// maxHeight: "100%",
				}}
				// variant="outlined"
				onChange={(_event, value) => {
					// setCurrentTab(value?.toString() || "appearance");
					navigate(value?.toString() || "");
				}}
				aria-label="Settings tabs"
				value={
					(settingsRoute.children || []).filter(
						(v) => v?.path && pathname.endsWith(v?.path)
					)[0]?.path
				}
			>
				<TabList
				// sx={{ "--variant-plainActiveBg": "transparent" }}
				>
					<Tab value={"appearance"}>Appearance</Tab>
					<Tab value={"other"}>Other</Tab>
				</TabList>

				{/* <TabPanel value={"appearance"}>
						<AppearanceTab />
					</TabPanel>
					<TabPanel value={"other"}>
						<OtherTab />
					</TabPanel> */}
			</Tabs>
			<Box
				flex={"1"}
				sx={{
					overflowY: "auto",
					padding: "16px",
					scrollbarGutter: "stable",
				}}
			>
				<Stack gap="24px">
					<Outlet />
				</Stack>
			</Box>
		</Box>
	);
}

export const settingsRoute: RouteObject = {
	path: "settings",
	element: <Settings />,
	loader: async ({ request }) => {
		const pathname = new URL(request.url).pathname;
		if (
			(settingsRoute.children || []).filter(
				(v) => v.path && pathname.endsWith(v.path)
			).length === 0
		) {
			return redirect("appearance");
		} else {
			return;
		}
	},
	children: [
		{
			path: "appearance",
			element: <AppearanceTab />,
		},
		{
			path: "other",
			element: <OtherTab />,
		},
	],
};