import {
	Box,
	Button,
	Center,
	Container,
	Heading,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Spinner,
	Stack,
	Text,
	useBoolean,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../providers/AppContext";
import { CaseType, StoreItemType } from "../../types/types";
import { errorHandler } from "../../utils";
const Roulette = lazy(() => import("./Roulette"));

function OpenCase() {
	const [opening, setOpening] = useState(false);
	const [item, setItem] = useState<CaseType | null>(null);
	const [loading, setLoading] = useBoolean(true);
	const [buttonLoading, setButtonLoading] = useBoolean(false);
	const toast = useToast();
	const params = useParams();
	const [drop, setDrop] = useState<StoreItemType | null>(null);
	const navigate = useNavigate();
	const dropModal = useDisclosure();

	useEffect(() => {
		const getData = async () => {
			setLoading.on();
			try {
				const { data } = await axios.get(
					`https://api.silentclient.net/store/get_item?type=cases&id=${params.id}`
				);

				setItem(data.case);
			} catch (error) {
				errorHandler(error, toast);
				navigate("/cases");
			} finally {
				setLoading.off();
			}
		};

		getData();
	}, []);

	const context = useContext(AppContext);

	const handleDrop = (item: any) => {
		setDrop(item);
		dropModal.onOpen();
		setOpening(false);
	};

	return loading ? (
		<Center w="full" p={5}>
			<Spinner size={"xl"} color="white"></Spinner>
		</Center>
	) : item ? (
		<>
			<Container
				p={4}
				bgColor={"#131313"}
				maxW="container.sm"
				minH={"230px"}
				h="230px"
				borderRadius={"xl"}
				overflow={"hidden"}
				maxH="230px"
			>
				{(!opening && (
					<Center>
						<Stack alignItems={"center"} direction={"column"} spacing={1}>
							<Heading size="md">{item.name}</Heading>
							<LazyLoadImage
								width={"170px"}
								height={"170px"}
								src={`https://api.silentclient.net${item.preview}`}
							/>
						</Stack>
					</Center>
				)) || (
					<Suspense fallback={<></>}>
						<Roulette result={drop} handleDrop={handleDrop} item={item} />
					</Suspense>
				)}
			</Container>

			<Center>
				<Button
					isLoading={buttonLoading}
					isDisabled={opening}
					w={["full", "150px"]}
					mt={2}
					onClick={async () => {
						if (!context.props.account) {
							window.location.href = `https://auth.silentclient.net/login?redirect_url=${window.location.href}`;
							return;
						}
						setButtonLoading.on();
						try {
							const { data: res } = await axios.post(
								"https://api.silentclient.net/store/open_case",
								{
									id: item.id,
								},
								{
									headers: {
										Authorization: `Bearer ${context.props?.accessToken}`,
									},
								}
							);
							await context.updateUser();
							setDrop({
								...res.drop,
								alreadyOwned: res.alreadyOwned,
							});
							setOpening(true);
						} catch (error) {
							errorHandler(error, toast);
						} finally {
							setButtonLoading.off();
						}
					}}
				>
					Open Case
				</Button>
			</Center>

			<Box mt={5}>
				<Center>
					<Heading size={"md"}>Case Content</Heading>
				</Center>
				<SimpleGrid mt={2} spacing={2} columns={[2, 3, 5]}>
					{item.items.map(caseItem => (
						<Box userSelect={"none"} p={2} bgColor={"#131313"}>
							{caseItem.preview ? (
								<>
									<Center>
										<Image
											width="100px"
											height="100px"
											src={
												caseItem.preview
													? `https://api.silentclient.net${caseItem.preview}`
													: ""
											}
										/>
									</Center>

									<Text size={"sm"} mt={2}>
										{caseItem.name}
									</Text>
								</>
							) : (
								<Center h="full">
									<Heading>{caseItem.name}</Heading>
								</Center>
							)}
						</Box>
					))}
				</SimpleGrid>

				<Modal isOpen={dropModal.isOpen} onClose={dropModal.onClose}>
					<ModalOverlay />
					<ModalContent bgColor="#131313">
						<ModalHeader>{drop?.name}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Center w="full">
								{(drop?.preview && (
									<Image
										w="300px"
										h="300px"
										src={`https://api.silentclient.net${drop?.preview}`}
									/>
								)) || (
									<Center h="300px" w="300px">
										<Heading textAlign={"center"} w="300px">
											{drop?.name}
										</Heading>
									</Center>
								)}
							</Center>
						</ModalBody>

						<ModalFooter>
							<Button onClick={dropModal.onClose} w="full">
								Claim
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</>
	) : (
		<Navigate to="/cases" />
	);
}

export default OpenCase;
