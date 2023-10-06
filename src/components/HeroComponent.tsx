import { Center, Heading, Image, Stack, Text } from "@chakra-ui/react";
import minecraftHero from "../assets/minecraft_hero.png";

function HeroComponent() {
	return (
		<Stack
			zIndex={2}
			h={["auto", "30vh"]}
			direction={["column", "row"]}
			justifyContent={"space-between"}
			spacing={[4, 2]}
			alignItems={"center"}
		>
			<Center
				display={["none", "flex"]}
				position={"absolute"}
				w="full"
				top="70px"
				justifyContent={"start"}
			>
				<Image w="30%" src={minecraftHero} />
			</Center>
			<Center
				position={["unset", "absolute"]}
				w="full"
				h="full"
				justifyContent={"center"}
			>
				<Stack textAlign={"center"} direction={"column"} spacing={[1, 2]}>
					<Heading size={"lg"} fontWeight={500}>
						Welcome to SIlent Client Marketplace! 👋
					</Heading>
					<Text fontSize={"xl"} opacity={"0.8"}>
						Buy and sell cosmetics in a few clicks
					</Text>
				</Stack>
			</Center>
			<Center display={["flex", "none"]}>
				<Image ml="40px" w="300px" src={minecraftHero} />
			</Center>
			{/* <Flex
				display={["none", "flex"]}
				maxW="30%"
				w="full"
				justifyContent={"end"}
			/> */}
		</Stack>
	);
}

export default HeroComponent;
