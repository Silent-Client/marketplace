import { Progress } from "@chakra-ui/react";

function Loader() {
	return (
		<Progress colorScheme="whiteAlpha" borderRadius={"xl"} isIndeterminate />
	);
}

export default Loader;
