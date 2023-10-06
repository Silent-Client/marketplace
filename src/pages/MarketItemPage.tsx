import {
	Button,
	Center,
	Container,
	Heading,
	Image,
	Spinner,
	Stack,
	Text,
	useBoolean,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BuySellModal from "../components/BuySellModal";
import { AppContext } from "../providers/AppContext";
import { ItemPageType } from "../types/types";
import { errorHandler } from "../utils";

function MarketItemPage() {
	const params = useParams();
	const [loading, setLoading] = useBoolean(true);
	const [item, setItem] = useState<ItemPageType | null>(null);
	const [modalType, setModalType] = useState<"sell" | "order">("sell");
	const modal = useDisclosure();
	const context = useContext(AppContext);
	const toast = useToast();
	const navigate = useNavigate();

	const getData = async (disableLoading?: boolean) => {
		if (!disableLoading) {
			setLoading.on();
		}
		try {
			const { data } = await axios.get(
				`https://api.silentclient.net/marketplace/item/${params.type}/${params.id}`
			);

			setItem(data.info);
		} catch (error) {
			errorHandler(error, toast);
			navigate("/");
		} finally {
			setLoading.off();
		}
	};

	useEffect(() => {
		getData();
		context.updateUser();

		const interval = setInterval(() => {
			if (!loading) {
				getData(true);
				context.updateUser();
			}
		}, 10000);
		return () => clearInterval(interval);
	}, []);

	const min_price =
		item?.lots.length !== 0
			? ((item?.lots[0].price || 0) / 100).toFixed(2) + "$"
			: "Unknown";

	const min_order_price =
		item?.orders.length !== 0
			? ((item?.orders[0].max_price || 0) / 100).toFixed(2) + "$"
			: "Unknown";

	return (
		<>
			{(loading && (
				<Center w="full" p={5}>
					<Spinner size={"xl"} color="white"></Spinner>
				</Center>
			)) || (
				<Container maxW="container.xl">
					<Stack
						direction={["column", "row"]}
						justifyContent={"space-between"}
						alignItems={"center"}
					>
						<Stack
							alignItems={["start", "center"]}
							direction={["column", "row"]}
							spacing={3}
						>
							<Center bgColor={"#131313"} borderRadius={"xl"} p={2}>
								<Image
									src={`https://api.silentclient.net${item?.item.preview}`}
									w={["full", "200px"]}
									h={["auto", "200px"]}
								/>
							</Center>
							<Stack direction={"column"} spacing={1}>
								<Heading size={"md"}>{item?.item.name}</Heading>
								<Text opacity={"0.8"} fontSize={"md"}>
									{item?.item.category}
								</Text>
								<Heading size={"md"}>{min_price}</Heading>
							</Stack>
						</Stack>
						<Stack
							maxW={["full", "30%"]}
							w={["full", "auto"]}
							alignItems={["start", "center"]}
							direction={"column"}
							spacing={2}
						>
							<Text fontSize={"md"}>
								{item?.orders.length}{" "}
								<span style={{ opacity: "0.8" }}>requests to buy at</span>{" "}
								{min_order_price}{" "}
								<span style={{ opacity: "0.8" }}>or lower</span>
							</Text>
							{(item?.orders.find(
								o => o.user_id === context.props.account?.id
							) && (
								<>
									<Text textAlign={"left"} w="full">
										My order:{" "}
										{(
											(item?.orders.find(
												o => o.user_id === context.props.account?.id
											)?.max_price || 0) / 100
										).toFixed(2)}
										$
									</Text>
									<Button
										w="full"
										onClick={async () => {
											const order = item?.orders.find(
												o => o.user_id === context.props.account?.id
											);
											try {
												await axios.post(
													`https://api.silentclient.net/marketplace/item/${params.type}/${params.id}/delete_order`,
													{ id: order?.id },
													{
														headers: {
															Authorization: `Bearer ${context.props.accessToken}`,
														},
													}
												);

												toast({
													title: `Order was canceled`,
													status: "success",
													duration: 3000,
													isClosable: true,
												});
											} catch (error) {
												errorHandler(error, toast);
											} finally {
												getData();
											}
										}}
										size={"md"}
										fontSize={"xl"}
									>
										Cancel Order
									</Button>
								</>
							)) || (
								<Button
									w="full"
									onClick={() => {
										if (context.props.account) {
											setModalType("order");
											modal.onOpen();
										} else {
											window.location.href = `https://auth.silentclient.net/login?redirect_url=${window.location.href}`;
										}
									}}
									size={"md"}
									fontSize={"xl"}
								>
									Order
								</Button>
							)}
						</Stack>
					</Stack>

					<Stack
						alignItems={"center"}
						justifyContent={"center"}
						direction={"row"}
						spacing={5}
						mt={5}
					>
						<Stack direction={"column"} w={["full", "70%"]} spacing={2}>
							<Stack
								alignItems={"center"}
								direction={"row"}
								justifyContent={"space-between"}
							>
								<Heading size={"md"}>Lots</Heading>
								<Button
									w="100px"
									onClick={() => {
										if (context.props.account) {
											setModalType("sell");
											modal.onOpen();
										} else {
											window.location.href = `https://auth.silentclient.net/login?redirect_url=${window.location.href}`;
										}
									}}
								>
									Sell Item
								</Button>
							</Stack>

							{item?.lots.map(lot => (
								<Stack
									direction={"row"}
									justifyContent={"space-between"}
									spacing={2}
									alignItems={["start", "center"]}
								>
									<Stack alignItems={"center"} direction={"row"} spacing={1}>
										<Image
											src={`https://mc-heads.net/avatar/${lot.user.username}.png`}
											w="50px"
											h="50px"
										></Image>
										<Stack direction={"column"} spacing={0}>
											<Heading size={"sm"}>
												{(lot.price / 100).toFixed(2)}$
											</Heading>
											<Text opacity={"0.8"}>by {lot.user.username}</Text>
										</Stack>
									</Stack>
									<Button
										onClick={async () => {
											try {
												if (lot.user_id === context.props.account?.id) {
													await axios.post(
														`https://api.silentclient.net/marketplace/item/${params.type}/${params.id}/delete_lot`,
														{ id: lot.id },
														{
															headers: {
																Authorization: `Bearer ${context.props.accessToken}`,
															},
														}
													);

													toast({
														title: `Lot was canceled`,
														status: "success",
														duration: 3000,
														isClosable: true,
													});
													return;
												}

												await axios.post(
													`https://api.silentclient.net/marketplace/item/${params.type}/${params.id}/buy_lot`,
													{ id: lot.id },
													{
														headers: {
															Authorization: `Bearer ${context.props.accessToken}`,
														},
													}
												);

												toast({
													title: `Lot was buyed`,
													status: "success",
													duration: 3000,
													isClosable: true,
												});
											} catch (error) {
												errorHandler(error, toast);
											} finally {
												getData();
												context.updateUser();
											}
										}}
										maxW="100px"
										w={"full"}
									>
										{lot.user_id === context.props.account?.id
											? "Cancel"
											: "Buy"}
									</Button>
								</Stack>
							))}
						</Stack>
					</Stack>
				</Container>
			)}
			<BuySellModal
				isOpen={modal.isOpen}
				onClose={modal.onClose}
				item={item}
				getData={getData}
				type={modalType}
			/>
		</>
	);
}

export default MarketItemPage;
