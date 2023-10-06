import {
	Center,
	Heading,
	Link,
	Spinner,
	Stack,
	useBoolean,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../providers/AppContext";
import { ExtendedMarketplaceItem } from "../types/types";
import { errorHandler } from "../utils";
import MarketplaceItemComponent from "./MarketplaceItemComponent";

function MyLotsComponent() {
	const context = useContext(AppContext);
	const [items, setItems] = useState<ExtendedMarketplaceItem[] | null>([]);
	const [isLoading, setLoading] = useBoolean(true);
	const toast = useToast();

	const getData = async () => {
		setLoading.on();

		try {
			const { data: res } = await axios.get(
				"https://api.silentclient.net/marketplace/my_lots",
				{
					headers: {
						Authorization: `Bearer ${context.props.accessToken}`,
					},
				}
			);

			setItems(res.items);
		} catch (error) {
			errorHandler(error, toast);
		} finally {
			setLoading.off();
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return isLoading ? (
		<Center w="full" p={2}>
			<Spinner size={"xl"} color="white" />
		</Center>
	) : items?.length !== 0 ? (
		<Stack direction={"column"} spacing={2}>
			{items?.map(item => {
				return (
					<MarketplaceItemComponent
						name={item.item.name}
						description={`Listed on ${moment(item.created_at).format(
							"D MMMM"
						)}`}
						price={`${(item.price / 100).toFixed(2)}$`}
						preview={`https://api.silentclient.net${item.item.preview}`}
						href={`/listings/${item.item_type}/${item.item_id}`}
						footer={
							<Link
								opacity={"0.8"}
								textDecoration={"underline"}
								_hover={{
									opacity: "1",
								}}
								fontSize={"md"}
								onClick={async () => {
									try {
										await axios.post(
											`https://api.silentclient.net/marketplace/item/${item.item_type}/${item.item_id}/delete_lot`,
											{ id: item.id },
											{
												headers: {
													Authorization: `Bearer ${context.props.accessToken}`,
												},
											}
										);
									} catch (error) {
										errorHandler(error, toast);
									} finally {
										getData();
									}
								}}
							>
								Remove
							</Link>
						}
					/>
				);
			})}
		</Stack>
	) : (
		<Center minH={"48px"}>
			<Heading size={"sm"}>Sell listings not found</Heading>
		</Center>
	);
}

export default MyLotsComponent;
