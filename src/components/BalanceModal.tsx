import {
	Button,
	FormControl,
	FormHelperText,
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
import { AppContext } from "../providers/AppContext";

function BalanceModal({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) {
	const context = useContext(AppContext);
	const [promoRow, setPromoRow] = useState<string>("");
	const [promo, setPromo] = useState<{
		id: number;
		promo: string;
		multiplier: number;
		activated: number;
		max_activated: number;
		partner_id: number | null;
		created_at: string | null;
		updated_at: string | null;
	} | null>(null);
	const [amount, setAmount] = useState<number>();
	const [isLoading, setIsLoading] = useBoolean(false);
	const toast = useToast();

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (promoRow.trim() === "") {
				setPromo(null);
				return;
			}
			try {
				setIsLoading.on();
				const { data: promo } = await axios.get(
					`https://api.silentclient.net/promos/get?promo=${promoRow}`
				);

				if (
					promo.promo.max_activated &&
					promo.promo.activated >= promo.promo.max_activated
				) {
					toast({
						title: "Error!",
						description: "Promo has already been activated!",
						status: "error",
						duration: 3000,
						isClosable: true,
					});
					setPromo(null);
					return;
				}

				setPromo(promo.promo);
			} catch (err: any) {
				if (err?.response && err.response?.data && err.response.data?.errors) {
					for (const error of err.response.data.errors) {
						toast({
							title: "Error!",
							description: error.message,
							status: "error",
							duration: 3000,
							isClosable: true,
						});
					}
				}
				setPromo(null);
			} finally {
				setIsLoading.off();
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [promoRow]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent pt={0} bgColor="#131313">
				<ModalHeader>Balance replenishment</ModalHeader>
				<ModalCloseButton />
				<ModalBody mb={2}>
					<Stack direction={"column"} spacing={2}>
						<FormControl>
							<FormLabel>Amount</FormLabel>
							<Input
								value={amount}
								onChange={e => setAmount(Number(e.currentTarget.value))}
								type="number"
								placeholder={"Amount"}
							/>
							<FormHelperText>Minimum amount 0.50$</FormHelperText>
						</FormControl>
						<FormControl>
							<FormLabel>Promo Code</FormLabel>
							<Input
								value={promoRow}
								onChange={e => setPromoRow(e.currentTarget.value)}
								placeholder={"Promo Code"}
							/>
							{promo && (
								<FormHelperText color="green">
									+{promo.multiplier}%
								</FormHelperText>
							)}
						</FormControl>
						<Button
							onClick={async () => {
								try {
									setIsLoading.on();
									const { data: pay } = await axios.post(
										`https://api.silentclient.net/balance/add`,
										{
											amount: (amount || 0) * 100,
											promo: promo?.promo || null,
											currency: "usd",
										},
										{
											headers: {
												Authorization: `Bearer ${context.props.accessToken}`,
											},
										}
									);

									window.location.href = pay.payUrl;
								} catch (err: any) {
									if (
										err?.response &&
										err.response?.data &&
										err.response.data?.errors
									) {
										for (const error of err.response.data.errors) {
											toast({
												title: "Error!",
												description: error.message,
												status: "error",
												duration: 3000,
												isClosable: true,
											});
										}
									}
								} finally {
									setIsLoading.off();
								}
							}}
							isDisabled={isLoading}
						>
							Pay
						</Button>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default BalanceModal;
