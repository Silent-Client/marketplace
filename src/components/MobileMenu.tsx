import { ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	IconButton,
	Image,
	Link,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import { Suspense, lazy, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../providers/AppContext";
import { MenuItems } from "./Header";

const AccountMenu = lazy(() => import("./AccountMenu"));

function MobileMenu() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const context = useContext(AppContext);
	const location = useLocation();
	const navigate = useNavigate();
	const DrawerMenuItem = ({
		item,
	}: {
		item: { name: string; href: string; external?: boolean };
	}) => {
		return (
			<Link
				onClick={e => {
					e.preventDefault();
					if (!item.external) {
						navigate(item.href);
					} else {
						window.location.href = item.href;
					}
					onClose();
				}}
				w="full"
				href={item.href}
			>
				<Button
					w={"full"}
					fontWeight={location.pathname === item.href ? 600 : 500}
					color={location.pathname === item.href ? "white" : "#d4d4d4"}
					boxShadow={location.pathname === item.href ? "md" : "none"}
					_hover={
						location.pathname === item.href
							? {
									bgColor: "#131313",
							  }
							: undefined
					}
					bgColor={"#131313"}
					justifyContent={"start"}
				>
					<Stack direction={"row"} w="full" justifyContent={"space-between"}>
						<span>{item.name}</span>
						<ChevronRightIcon />
					</Stack>
				</Button>
			</Link>
		);
	};

	return (
		<>
			<IconButton aria-label="menu" icon={<HamburgerIcon />} onClick={onOpen} />

			<Drawer isOpen={isOpen} placement="left" size={"full"} onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader bgColor="black">
						<Image
							h="39px"
							w="auto"
							src={"https://assets.silentclient.net/logos/logo.svg"}
							alt="Silent Client Logo"
						/>
						<DrawerCloseButton top={3} h="39px" w="39px" />
					</DrawerHeader>

					<DrawerBody bgColor="black">
						<Stack direction={"column"} spacing={2}>
							{MenuItems.map((item, key) => (
								<DrawerMenuItem item={item} key={key} />
							))}

							{(context.props.account && (
								<Suspense fallback={<></>}>
									<AccountMenu onItemClick={onClose} isMobile={true} />
								</Suspense>
							)) || (
								<DrawerMenuItem
									item={{
										name: "Login",
										href: `https://auth.silentclient.net/login?redirect_url=${window.location.href}`,
										external: true,
									}}
								/>
							)}
						</Stack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default MobileMenu;
