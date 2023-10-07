import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import AuthProvider from "./providers/AuthProvider";

function Layout() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

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
