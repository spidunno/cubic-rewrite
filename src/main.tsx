import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router"; 
import Main from "./pages/timer/TimerPage";
import "./index.css";
import Root from "./pages/root/Root";
import Settings from "./pages/settings/Settings";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		children: [
			{
				index: true,
				element: <Main/>
			},
			{
				path: "settings",
				element: <Settings/>
			}
		]
	}
])

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router}/>
		{/* <BrowserRouter>
			<Routes>
				<Route path="/" element={<Root/>}>
					<Route index element={<Main/>}/>
					<Route path="settings" element={<Settings/>}/>
				</Route>
			</Routes>
		</BrowserRouter> */}
	</StrictMode>
);
