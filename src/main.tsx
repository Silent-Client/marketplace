import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loader from "./components/Loader.tsx";
import "./css/global.css";
import Error from "./pages/Error.tsx";
import AppProvider from "./providers/AppContext.tsx";
import theme from "./theme.ts";

const router = createBrowserRouter([
	{
		path: "/",
		async lazy() {
			const page = await import("./Layout.tsx");
			return { Component: page.default, loader: Loader };
		},
		errorElement: <Error />,
		children: [
			{
				index: true,
				async lazy() {
					const page = await import("./pages/Main.tsx");
					return { Component: page.default, loader: Loader };
				},
			},
			{
				path: "/listings/:type/:id",
				async lazy() {
					const page = await import("./pages/MarketItemPage.tsx");
					return { Component: page.default, loader: Loader };
				},
			},
			{
				path: "*",
				async lazy() {
					const page = await import("./pages/NotFound.tsx");
					return { Component: page.default, loader: Loader };
				},
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<ChakraProvider theme={theme}>
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	</ChakraProvider>
);
