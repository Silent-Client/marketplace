import {
	Button,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	useBoolean,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { AppContext } from "../providers/AppContext";
import { ItemPageType, SaleType } from "../types/types";
import { capitalize, errorHandler } from "../utils";

function BuySellModal({
	isOpen,
	onClose,
	type,
	item,
	getData,
}: {
	isOpen: boolean;
	onClose: () => void;
	item: ItemPageType | null;
	getData: () => void;
	type: "sell" | "order";
}) {
	const params = useParams();
	const [price, setPrice] = useState<string>();
	const [isLoading, setIsLoading] = useBoolean(false);
	const toast = useToast();
	const context = useContext(AppContext);
	const [sales, setSales] = useState<SaleType[]>([]);
	const [medianType] = useState("week");

	const getSales = async () => {
		try {
			const { data } = await axios.get(
				`https://api.silentclient.net/marketplace/item/${params.type}/${params.id}/get_median_sales?type=${medianType}`
			);

			setSales(data.sales);
		} catch (error) {
			errorHandler(error, toast);
		}
	};

	useEffect(() => {
		getSales();
	}, [medianType]);

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bgColor="#131313">
					<ModalHeader>
						{capitalize(type)} {item?.item.name}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody mb={2}>
						<ResponsiveContainer aspect={1.5} width="100%" height="100%">
							<LineChart
								width={500}
								height={300}
								margin={{
									left: -25,
								}}
								data={sales.map(sale => {
									return {
										name: sale.date,
										Price: (sale.median_price / 100).toFixed(2),
									};
								})}
							>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip
									formatter={value => value + "$"}
									contentStyle={{
										background: "#151515",
										border: "none",
										borderRadius: "15px",
									}}
								/>
								<Legend />
								<Line type="monotone" dataKey="Price" stroke="white" />
							</LineChart>
						</ResponsiveContainer>
						<Stack direction={"column"} spacing={2}>
							<FormControl>
								<FormLabel>
									{type === "order" ? "Max price" : "Price"}
								</FormLabel>
								<Input
									value={price}
									onChange={e => setPrice(e.currentTarget.value)}
									placeholder={"Price"}
								/>
							</FormControl>

							<Button
								onClick={async () => {
									try {
										setIsLoading.on();
										const { data } = await axios.post(
											`https://api.silentclient.net/marketplace/item/${
												params.type
											}/${params.id}/${
												type === "sell" ? "create_lot" : "create_order"
											}`,
											{
												price:
													parseFloat(price?.replaceAll(",", ".") || "0") * 100,
												max_price:
													parseFloat(price?.replaceAll(",", ".") || "0") * 100,
											},
											{
												headers: {
													Authorization: `Bearer ${context.props.accessToken}`,
												},
											}
										);
										onClose();
										setPrice("");
										toast({
											title: `${type === "order" ? "Order" : "Lot"} created!`,
											status: "success",
											duration: 3000,
											isClosable: true,
										});

										if (type === "order") {
											if (!data.order) {
												toast({
													title: `The order has been completed!`,
													status: "success",
													duration: 3000,
													isClosable: true,
												});
											}
										} else {
											if (data.lot.status === "sold") {
												toast({
													title: `The lot has been sold!`,
													status: "success",
													duration: 3000,
													isClosable: true,
												});
											}
										}
									} catch (err: any) {
										errorHandler(err, toast);
									} finally {
										getData();
										context.updateUser();
										setIsLoading.off();
									}
								}}
								isDisabled={isLoading}
							>
								{capitalize(type)}
							</Button>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}

export default BuySellModal;
