import { Center, Heading, Link, Stack } from "@chakra-ui/react";
import { Link as RLink } from "react-router-dom";

function NotFound() {
	return (
		<Center p={5}>
			<Stack textAlign={"center"} direction={"column"} spacing={2}>
				<Heading>Page not found 😢</Heading>
				<Link
					opacity={"0.8"}
					_hover={{
						textDecoration: "none",
						opacity: "1",
					}}
					fontSize={"lg"}
					as={RLink}
					to="/"
				>
					Go to Home
				</Link>
			</Stack>
		</Center>
	);
}

export default NotFound;
