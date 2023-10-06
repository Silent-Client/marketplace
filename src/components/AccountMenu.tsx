import { Image, Link, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { useContext } from "react";
import { AppContext } from "../providers/AppContext";

function AccountMenu() {
	const context = useContext(AppContext);

	return (
		<Menu>
			<MenuButton as={Link} w="45px">
				<Image
					src={`https://mc-heads.net/avatar/${context.props.account?.original_username}.png`}
					w="45px"
					h="45px"
					borderRadius={"md"}
					alt={"Minecraft User Avatar"}
				/>
			</MenuButton>
			<MenuList bgColor="black"></MenuList>
		</Menu>
	);
}

export default AccountMenu;
