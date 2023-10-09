import {
	Center,
	Heading,
	SimpleGrid,
	Spinner,
	Stack,
	Text,
	useBoolean,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { AppContext } from "../providers/AppContext";
import { StoreItemType } from "../types/types";
import { errorHandler, isPremium, isPremiumPlus } from "../utils";

function Cases() {
	const [cases, setCases] = useState<StoreItemType[]>([]);
	const [loading, setLoading] = useBoolean(true);
	const toast = useToast();

	useEffect(() => {
		const getData = async () => {
			setLoading.on();
			try {
				const { data } = await axios.get(
					"https://api.silentclient.net/store/cases"
				);

				setCases(data.cases);
			} catch (error) {
				errorHandler(error, toast);
			} finally {
				setLoading.off();
			}
		};

		getData();
	}, []);

	const context = useContext(AppContext);

	return loading ? (
		<Center w="full" p={5}>
			<Spinner size={"xl"} color="white"></Spinner>
		</Center>
	) : (
		<>
			<Center>
				<Heading>Cases</Heading>
			</Center>

			<SimpleGrid mt={5} columns={[1, 2, 3, 3, 4]} spacing={2}>
				{cases.map(container => (
					<Stack
						cursor={"pointer"}
						direction={"column"}
						spacing={2}
						bgColor={"#131313"}
						p={4}
						transitionProperty={
							"var(--silentclient-transition-property-common)"
						}
						transitionDuration={
							"var(--silentclient-transition-duration-normal)"
						}
						transitionTimingFunction={
							"var(--silentclient-transition-easing-ease-out)"
						}
						border="2px solid"
						borderColor={"transparent"}
						borderRadius={"xl"}
						_hover={{
							borderColor: "white",
						}}
						as={Link}
						to={`/cases/${container.id}`}
					>
						<Center>
							<LazyLoadImage
								width={"230px"}
								height={"230px"}
								src={`https://api.silentclient.net${container.preview}`}
							/>
						</Center>
						<Stack
							alignItems={"center"}
							direction={"row"}
							justifyContent={"space-between"}
						>
							<Heading size={"sm"}>{container.name}</Heading>
							<Text fontSize={"md"} opacity={"0.8"}>
								{(
									(isPremium(context.props?.account)
										? Math.round(
												container.price -
													container.price *
														(isPremiumPlus(context.props?.account) ? 0.2 : 0.1)
										  )
										: container.price) / 100
								).toFixed(2)}
								$
							</Text>
						</Stack>
					</Stack>
				))}
			</SimpleGrid>
		</>
	);
}

export default Cases;
