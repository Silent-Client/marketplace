import {
	Button,
	Container,
	SimpleGrid,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useTab,
} from "@chakra-ui/react";
import React, { Suspense, lazy, useContext } from "react";
import HeroComponent from "../components/HeroComponent";
import MarketplaceItemsComponent from "../components/MarketplaceItemsComponent";
import { AppContext } from "../providers/AppContext";
const MyLotsComponent = lazy(() => import("../components/MyLotsComponent"));
const MyOrdersComponent = lazy(() => import("../components/MyOrdersComponent"));

function Main() {
	const context = useContext(AppContext);

	const CustomTab = React.forwardRef((props: any, ref) => {
		const tabProps = useTab({ ...props, ref: ref as any });
		const isSelected = !!tabProps["aria-selected"];

		return (
			<Button
				w="full"
				h="35px"
				fontSize={"xl"}
				borderRadius={"8px"}
				paddingInlineStart={6}
				paddingInlineEnd={6}
				_hover={{
					bgColor: isSelected ? "#252525" : "#202020",
				}}
				bgColor={isSelected ? "#252525" : "#131313"}
				{...tabProps}
			>
				{tabProps.children}
			</Button>
		);
	});

	return (
		<>
			<HeroComponent />

			<Container
				maxW={["full", "container.md"]}
				paddingInlineStart={0}
				paddingInlineEnd={0}
				mt={5}
			>
				{context.props.account && (
					<Tabs w="full" variant="soft-rounded" colorScheme="whiteAlpha" isLazy>
						<TabList w="full">
							<SimpleGrid
								w="full"
								alignItems={"center"}
								columns={2}
								spacing={2}
							>
								<CustomTab>My sell listings</CustomTab>
								<CustomTab>My buy orders</CustomTab>
							</SimpleGrid>
						</TabList>

						<TabPanels mt={2}>
							<TabPanel p={0}>
								<Suspense fallback={<></>}>
									<MyLotsComponent />
								</Suspense>
							</TabPanel>
							<TabPanel p={0}>
								<Suspense fallback={<></>}>
									<MyOrdersComponent />
								</Suspense>
							</TabPanel>
						</TabPanels>
					</Tabs>
				)}

				<Tabs
					mt={5}
					w="full"
					variant="soft-rounded"
					colorScheme="whiteAlpha"
					isLazy
				>
					<TabList w="full">
						<SimpleGrid w="full" columns={[2, 3]} spacing={2}>
							<CustomTab>Popular Items</CustomTab>
							<CustomTab>Recently Listed</CustomTab>
							<CustomTab gridColumn={["1/3", "3/3"]}>Recently Sold</CustomTab>
						</SimpleGrid>
					</TabList>

					<TabPanels mt={2}>
						<TabPanel p={0}>
							<MarketplaceItemsComponent
								showSearch
								apiUrl="https://api.silentclient.net/marketplace/items?filter=popular"
								footer={item =>
									item.last_seller ? (
										<Text textAlign={"right"} fontSize={"md"} opacity={"0.8"}>
											Last Seller: <br />
											{item.last_seller}
										</Text>
									) : (
										<></>
									)
								}
							/>
						</TabPanel>
						<TabPanel p={0}>
							<MarketplaceItemsComponent
								showSearch
								apiUrl="https://api.silentclient.net/marketplace/items?filter=listed"
								footer={item =>
									item.last_seller ? (
										<Text textAlign={"right"} fontSize={"md"} opacity={"0.8"}>
											Last Seller: <br />
											{item.last_seller}
										</Text>
									) : (
										<></>
									)
								}
							/>
						</TabPanel>
						<TabPanel p={0}>
							<MarketplaceItemsComponent
								showSearch
								apiUrl="https://api.silentclient.net/marketplace/items?filter=sold"
								footer={item =>
									item.last_seller ? (
										<Text textAlign={"right"} fontSize={"md"} opacity={"0.8"}>
											Last Seller: <br />
											{item.last_seller}
										</Text>
									) : (
										<></>
									)
								}
							/>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Container>
		</>
	);
}

export default Main;
