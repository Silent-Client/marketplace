import {
	Heading,
	Image,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link as RLink } from "react-router-dom";
import { AppContext } from "../providers/AppContext";

function AccountMenu({
	isMobile,
	onItemClick,
}: {
	isMobile: boolean;
	onItemClick?: () => void;
}) {
	const context = useContext(AppContext);

	const styles = {
		mobile: {
			background: "#131313",
			width: "100%",
			padding: "var(--silentclient-space-1)",
		},
		desktop: {
			background: "transparent",
			width: "45px",
			padding: 0,
		},
	};

	return (
		<Menu>
			<MenuButton
				p={2}
				borderRadius={"md"}
				style={styles[isMobile ? "mobile" : "desktop"]}
			>
				<Stack alignItems={"center"} direction={"row"} spacing={1}>
					<Image
						src={`https://mc-heads.net/avatar/${context.props.account?.original_username}.png`}
						w="45px"
						h="45px"
						borderRadius={"md"}
						alt={"Minecraft User Avatar"}
					/>
					{isMobile && (
						<Heading size="sm">
							{context.props.account?.original_username}
						</Heading>
					)}
				</Stack>
			</MenuButton>
			<MenuList onClick={onItemClick} zIndex={"modal"} bgColor="black">
				<MenuItem
					bgColor="transparent"
					_hover={{
						bgColor: "#131313",
					}}
					as={RLink}
					to="/account"
				>
					Account
				</MenuItem>
				<MenuItem
					bgColor="transparent"
					_hover={{
						bgColor: "#131313",
						textDecoration: "none",
					}}
					as={Link}
					href="https://support.silentclient.net"
				>
					Support
				</MenuItem>
				<MenuItem
					bgColor="transparent"
					_hover={{
						bgColor: "#131313",
						textDecoration: "none",
					}}
					as={Link}
					href={`https://auth.silentclient.net/logout?redirect_url=${window.location.href}`}
				>
					Logout
				</MenuItem>
			</MenuList>
		</Menu>
	);
}

export default AccountMenu;
