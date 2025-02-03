import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import TimerPage from "./pages/timer/TimerPage";
import "./index.css";
import Root from "./pages/root/Root";
import { settingsRoute } from "./pages/settings/Settings";
import Solves from "./pages/solves/Solves";
import Sessions from "./pages/sessions/Sessions";
// import { ErrorBoundary } from "./pages/error/ErrorBoundary";
import { CssBaseline, CssVarsProvider, extendTheme, useColorScheme } from "@mui/joy";
import { useAtomValue } from "jotai";
import { themeModeAtom } from "./state/settings";

export const router = createBrowserRouter(
	[
		{
			path: "/",

			element: <Root />,
			//// @ts-expect-error
			// ErrorBoundary,
			// errorElement: <ErrorElement/>,
			children: [
				{
					index: true,
					element: <TimerPage />,
				},
				settingsRoute,
				{
					path: "solves",
					element: <Solves />,
				},
				{
					path: "sessions",
					element: <Sessions />,
				},
			],
		},
	],
	{ basename: import.meta.env.BASE_URL }
);

const ThemeUpdater = () => {
	const themeMode = useAtomValue(themeModeAtom);
	const { setMode } = useColorScheme();
	useEffect(() => {
		setMode(themeMode);
	}, [themeMode]);
	return null;
};

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<CssVarsProvider theme={extendTheme({
			components: {
				JoySwitch: {
					styleOverrides: {
						root: {
							"& .MuiSwitch-thumb.Mui-checked": {
								transform: "translate(calc(var(--Switch-trackWidth)/2 - 1px), -50%)",
							}
						},
						thumb: {
							left: "0 !important",
							transform: "translate(var(--unstable_paddingBlock), -50%)",
							transition: "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)"
						}
					}
				}
			}
		})}>
			<ThemeUpdater />
			<CssBaseline />
			<RouterProvider router={router} />
			{/* <BrowserRouter>
			<Routes>
				<Route path="/" element={<Root/>}>
					<Route index element={<Main/>}/>
					<Route path="settings" element={<Settings/>}/>
				</Route>
			</Routes>
		</BrowserRouter> */}
		</CssVarsProvider>
	</StrictMode>
);
