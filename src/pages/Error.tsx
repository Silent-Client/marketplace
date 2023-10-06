import { Center, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RLink, useRouteError } from "react-router-dom";

function Error() {
	const error = useRouteError();

	return (
		<Center minH="100vh" p={5}>
			<Stack textAlign={"center"} direction={"column"} spacing={2}>
				<Heading>Unknown Error 😢</Heading>
				<Text opacity={"0.8"}>{(error as any).toString()}</Text>
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

export default Error;
