import {
	Box,
	Button,
	Center,
	Icon,
	Image,
	Link,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { Link as RLink, useLocation } from "react-router-dom";
import { AppContext } from "../providers/AppContext";
import AccountMenu from "./AccountMenu";
import BalanceModal from "./BalanceModal";

export const MenuItems = [
	{
		name: "Marketplace",
		href: "/",
	},
	{
		name: "Cases",
		href: "/cases",
	},
	{
		name: "Premium",
		href: "/premium",
	},
	{
		name: "About",
		href: "/about",
	},
];

function Header() {
	const location = useLocation();
	const context = useContext(AppContext);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Stack
			bgColor={"black"}
			h="80px"
			w="full"
			position={"fixed"}
			paddingInlineStart={"20px"}
			paddingInlineEnd={"20px"}
			alignItems={"center"}
			textAlign={"center"}
			alignContent={"center"}
			direction={"row"}
			justifyContent={"space-between"}
			as={"header"}
			zIndex={5}
		>
			<Center w="full" h="full" justifyContent={"start"}>
				<Link w="auto" userSelect={"none"} as={RLink} to="/">
					<Image
						h="39px"
						w="auto"
						src={"https://assets.silentclient.net/logos/logo.svg"}
						alt={"Silent Client"}
					/>
				</Link>
			</Center>
			<Center
				justifyContent={"center"}
				w="full"
				h="full"
				display={["none", "flex"]}
			>
				<Stack direction={"row"} spacing={4}>
					{MenuItems.map(item => (
						<Link
							fontSize={"lg"}
							color="white"
							fontWeight={"bold"}
							opacity={location.pathname === item.href ? "1" : "0.5"}
							_hover={{
								opacity: location.pathname === item.href ? "1" : "0.9",
								textDecoration: "none",
							}}
							as={RLink}
							to={item.href}
						>
							{item.name}
						</Link>
					))}
				</Stack>
			</Center>

			<Center w="full" h="full" justifyContent={"end"}>
				<Stack alignItems={"center"} direction={"row"} spacing={2}>
					{(context.props.account && (
						<>
							<Box>
								<Link
									bgColor="rgba(255, 255, 255, 0.1)"
									borderRadius="5px"
									p="5px 10px"
									border="1px solid transparent"
									_hover={{
										borderColor: "white",
									}}
									display={["none", "block"]}
									onClick={onOpen}
								>
									<Icon>
										<FaPlus />
									</Icon>
									{((context.props.account.partner_balance || 0) / 100).toFixed(
										2
									)}
									${" "}
								</Link>
							</Box>

							<AccountMenu />
						</>
					)) || (
						<Button
							variant="outline"
							minWidth={["60px", "70px"]}
							borderColor="white"
							onClick={() => {
								window.location.href = `https://auth.silentclient.net/login?redirect_url=${window.location.href}`;
							}}
						>
							Login
						</Button>
					)}
				</Stack>
			</Center>

			<BalanceModal isOpen={isOpen} onClose={onClose} />
		</Stack>
	);
}

export default Header;
