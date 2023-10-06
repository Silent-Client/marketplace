import {
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Select,
	Stack,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { SaleType } from "../types/types";
import { errorHandler } from "../utils";

interface Inputs {
	type: string;
	id: number;
	price: string;
}

function Sell() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
		resetField,
	} = useForm<Inputs>();
	const navigate = useNavigate();
	const onSubmit: SubmitHandler<Inputs> = async data => {
		try {
			const { data: res } = await axios.post(
				`https://api.silentclient.net/marketplace/item/${data.type}/${data.id}/create_lot`,
				{
					price: parseFloat(data.price?.replaceAll(",", ".") || "0") * 100,
				},
				{
					headers: {
						Authorization: `Bearer ${context.props.accessToken}`,
					},
				}
			);

			toast({
				title: `Lot created!`,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
			if (res.lot.status === "sold") {
				toast({
					title: `The lot has been sold!`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			}
			navigate(`/listings/${data.type}/${data.id}`);
		} catch (error) {
			errorHandler(error, toast);
		}
	};
	const context = useContext(AppContext);
	const toast = useToast();
	const [sales, setSales] = useState<SaleType[]>([]);

	useEffect(() => {
		resetField("id");
	}, [watch("type")]);

	useEffect(() => {
		const getSales = async () => {
			try {
				const { data } = await axios.get(
					`https://api.silentclient.net/marketplace/item/${watch(
						"type"
					)}/${watch("id")}/get_median_sales?type=week`
				);

				setSales(data.sales);
			} catch (error) {
				// errorHandler(error, toast);
			}
		};

		getSales();
	}, [watch("id")]);

	return (
		<Center w="full" paddingInlineStart={4} paddingInlineEnd={4}>
			<form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
				<Stack
					w={["full", "500px"]}
					maxW="full"
					direction={"column"}
					spacing={2}
				>
					<Heading>Sell Item</Heading>
					{watch("id") && sales.length !== 0 && (
						<ResponsiveContainer aspect={2.5} width="100%">
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
					)}
					<FormControl isInvalid={errors.type ? true : false}>
						<FormLabel>Type</FormLabel>
						<Select
							isDisabled={isSubmitting}
							placeholder="Select type"
							{...register("type", { required: true })}
						>
							<option value="capes">Capes</option>
							<option value="wings">Wings</option>
							<option value="bandanas">Bandanas</option>
							<option value="hats">Hats</option>
							<option value="shields">Shields</option>
						</Select>

						{errors.type && (
							<FormErrorMessage>This field is required</FormErrorMessage>
						)}
					</FormControl>
					{watch("type") && (
						<FormControl isInvalid={errors.id ? true : false}>
							<FormLabel>Item</FormLabel>
							<Select
								isDisabled={isSubmitting}
								placeholder="Select item"
								{...register("id", { required: true })}
							>
								{context.props.account?.cosmetics[watch("type") as "capes"].map(
									item => (
										<option value={item.id.toString()}>{item.name}</option>
									)
								)}
							</Select>

							{errors.id && (
								<FormErrorMessage>This field is required</FormErrorMessage>
							)}
						</FormControl>
					)}
					<FormControl isInvalid={errors.price ? true : false}>
						<FormLabel>Price</FormLabel>
						<Input
							isDisabled={isSubmitting}
							placeholder="Price"
							{...register("price", { required: true })}
						></Input>

						{errors.price && (
							<FormErrorMessage>This field is required</FormErrorMessage>
						)}
					</FormControl>
					<Button isDisabled={isSubmitting} type="submit" w="full">
						Sell
					</Button>
				</Stack>
			</form>
		</Center>
	);
}

export default Sell;
