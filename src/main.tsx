import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router"; 
import Main from "./pages/timer/TimerPage";
import "./index.css";
import Root from "./pages/root/Root";
import Settings from "./pages/settings/Settings";
import Solves from "./pages/solves/Solves";
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
			},
			{
				path: "solves",
				element: <Solves/>
			}
		]
	}
], {basename: import.meta.env.BASE_URL});

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
