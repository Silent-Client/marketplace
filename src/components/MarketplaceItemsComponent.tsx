import {
	Center,
	Input,
	Spinner,
	Stack,
	useBoolean,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../providers/AppContext";
import { MarketplaceItem } from "../types/types";
import { errorHandler } from "../utils";
import MarketplaceItemComponent from "./MarketplaceItemComponent";

export interface MarketplaceItemsProps {
	description?: (item: MarketplaceItem) => string;
	price?: (item: MarketplaceItem) => string;
	apiUrl: string;
	footer?: (item: MarketplaceItem) => React.ReactElement;
	showSearch?: boolean;
}

function MarketplaceItemsComponent({
	apiUrl,
	description = item => `Quantity: ${item.count}`,
	price = item => `Started at ${(item.min_price / 100).toFixed(2)}$`,
	footer,
	showSearch,
}: MarketplaceItemsProps) {
	const context = useContext(AppContext);
	const [items, setItems] = useState<MarketplaceItem[] | null>([]);
	const [isLoading, setLoading] = useBoolean(true);
	const toast = useToast();
	const [search, setSearch] = useState<string>("");

	useEffect(() => {
		const getData = async () => {
			setLoading.on();

			try {
				const { data: res } = await axios.get(apiUrl, {
					headers: {
						Authorization: `Bearer ${context.props.accessToken}`,
					},
				});

				setItems(res.items);
			} catch (error) {
				errorHandler(error, toast);
			} finally {
				setLoading.off();
			}
		};

		getData();
	}, []);

	return isLoading ? (
		<Center w="full" p={2}>
			<Spinner size={"xl"} color="white" />
		</Center>
	) : (
		<Stack direction={"column"} spacing={2}>
			{showSearch && (
				<Input
					h="35px"
					bgColor={"#131313"}
					borderColor={"transparent"}
					borderRadius={"8px"}
					placeholder="Search"
					fontSize={"xl"}
					_placeholder={{
						color: "rgba(255, 255, 255, 0.60)",
					}}
					_hover={{
						borderColor: "transparent",
						bgColor: "whiteAlpha.300",
					}}
					_focus={{
						borderColor: "white",
						boxShadow: "none",
						bgColor: "#252525",
					}}
					value={search}
					onChange={e => setSearch(e.currentTarget.value)}
				/>
			)}
			{items
				?.filter(
					item =>
						search.trim() === "" ||
						item.name.toLowerCase().includes(search.toLowerCase().trim())
				)
				.map(item => {
					return (
						<MarketplaceItemComponent
							name={item.name}
							description={description(item)}
							price={price(item)}
							preview={`https://api.silentclient.net${item.preview}`}
							href={`/listings/${item.type}/${item.id}`}
							footer={footer ? footer(item) : undefined}
						/>
					);
				})}
		</Stack>
	);
}

export default MarketplaceItemsComponent;
