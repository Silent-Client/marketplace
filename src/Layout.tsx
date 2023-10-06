import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import AuthProvider from "./providers/AuthProvider";

function Layout() {
	return (
		<>
			<AuthProvider />
			<Header />

			<Box
				paddingInlineStart={["5px", "20px"]}
				paddingInlineEnd={["5px", "20px"]}
				pt="85px"
			>
				<Outlet />
			</Box>
		</>
	);
}

export default Layout;
