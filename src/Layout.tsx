import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import AuthProvider from "./providers/AuthProvider";

function Layout() {
	return (
		<>
			<AuthProvider>
				<Header />

				<Box
					paddingInlineStart={[4, "20px"]}
					paddingInlineEnd={[4, "20px"]}
					pt="85px"
				>
					<Outlet />
				</Box>
			</AuthProvider>
		</>
	);
}

export default Layout;
