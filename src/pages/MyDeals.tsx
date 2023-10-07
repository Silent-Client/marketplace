import {
	Badge,
	Center,
	Container,
	Heading,
	Spinner,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useBoolean,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { AppContext } from "../providers/AppContext";
import { DealType } from "../types/types";
import { errorHandler } from "../utils";

function MyDeals() {
	const context = useContext(AppContext);
	const toast = useToast();
	const [deals, setDeals] = useState<DealType[]>([]);
	const [loading, setLoading] = useBoolean(true);

	useEffect(() => {
		const getData = async () => {
			setLoading.on();
			try {
				const { data } = await axios.get(
					"https://api.silentclient.net/marketplace/my_deals",
					{
						headers: {
							Authorization: `Bearer ${context.props.accessToken}`,
						},
					}
				);

				setDeals(data.items);
			} catch (error) {
				errorHandler(error, toast);
			} finally {
				setLoading.off();
			}
		};

		getData();
	}, []);

	return loading ? (
		<Center w="full" p={5}>
			<Spinner size={"xl"} color="white"></Spinner>
		</Center>
	) : (
		<Container maxW="container.xl" textAlign={"center"}>
			<Heading>My Deals</Heading>

			{(deals.length === 0 && (
				<Heading mt={5} size="sm">
					Deals not found
				</Heading>
			)) || (
				<TableContainer bgColor={"#131313"} borderRadius={"xl"} mt={5}>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th
									borderColor={"rgba(255, 255, 255, 0.5)"}
									color={"white"}
									opacity={"0.8"}
								>
									ID
								</Th>
								<Th
									borderColor={"rgba(255, 255, 255, 0.5)"}
									color={"white"}
									opacity={"0.8"}
								>
									Type
								</Th>
								<Th
									borderColor={"rgba(255, 255, 255, 0.5)"}
									color={"white"}
									opacity={"0.8"}
								>
									Lot
								</Th>
								<Th
									borderColor={"rgba(255, 255, 255, 0.5)"}
									color={"white"}
									opacity={"0.8"}
								>
									Date
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{deals.map((deal, key) => (
								<Tr key={key}>
									<Td
										borderColor={
											key === deals.length - 1
												? "transparent"
												: "rgba(255, 255, 255, 0.5)"
										}
									>
										#{deal.id}
									</Td>
									<Td
										borderColor={
											key === deals.length - 1
												? "transparent"
												: "rgba(255, 255, 255, 0.5)"
										}
									>
										{deal.status === "purchase" ? "Purchase" : "Sell"}{" "}
										{!deal.readed && <Badge colorScheme="green">NEW</Badge>}
									</Td>
									<Td
										borderColor={
											key === deals.length - 1
												? "transparent"
												: "rgba(255, 255, 255, 0.5)"
										}
									>
										<Stack
											w="full"
											alignItems={"center"}
											direction={"row"}
											spacing={2}
											cursor={"pointer"}
											as={Link}
											to={`/listings/${deal.lot.item_type}/${deal.lot.item_id}`}
										>
											<LazyLoadImage
												src={`https://api.silentclient.net${deal.lot.item.preview}`}
												width={"40px"}
												height={"40px"}
											/>
											<Stack direction={"column"} spacing={0}>
												<Heading size={"sm"}>{deal.lot.item.name}</Heading>
												<Text fontSize={"sm"} opacity={"0.8"}>
													{(deal.lot.price / 100).toFixed(2)}$, by{" "}
													{deal.lot.user.username}
												</Text>
											</Stack>
										</Stack>
									</Td>
									<Td
										borderColor={
											key === deals.length - 1
												? "transparent"
												: "rgba(255, 255, 255, 0.5)"
										}
									>
										{moment(deal.created_at).format("LLL")}
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
}

export default MyDeals;
