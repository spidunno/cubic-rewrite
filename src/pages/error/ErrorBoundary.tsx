// import { isRouteErrorResponse, UNSAFE_RemixErrorBoundary } from "react-router";
// import { PropsOf } from "@emotion/react";

// export function ErrorBoundary({
// 	error,
// }: PropsOf<typeof UNSAFE_RemixErrorBoundary>) {
// 	if (isRouteErrorResponse(error)) {
// 		return (
// 			<>
// 				<h1>
// 					{error.status} {error.statusText}
// 				</h1>
// 				<p>{error.data}</p>
// 			</>
// 		);
// 	} else if (error instanceof Error) {
// 		return (
// 			<div>
// 				<h1>Error</h1>
// 				<p>{error.message}</p>
// 				<p>The stack trace is:</p>
// 				<pre>{error.stack}</pre>
// 			</div>
// 		);
// 	} else {
// 		return (
// 			<>
// 				<h1>Unknown Error</h1>
// 			</>
// 		);
// 	}
// }

// export function ErrorElement({ error }: {error: Error | undefined}) {
// 	return <>
// 		{/* {error?.message || "An E"} */}
// 	</>
// }