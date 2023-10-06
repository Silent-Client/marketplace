import { Box, Heading, Image, Link, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { Link as RLink } from "react-router-dom";

export interface MarketplaceItemComponentProps {
	name: string;
	description: string;
	price: string;
	preview: string;
	href: string;
	footer?: React.ReactElement;
}

function MarketplaceItemComponent(props: MarketplaceItemComponentProps) {
	const linkRef = useRef<HTMLAnchorElement | null>(null);
	const footerRef = useRef<HTMLDivElement | null>(null);
	const footerMobileRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		linkRef.current?.addEventListener("click", function (event) {
			if (
				footerRef.current?.matches(":hover") ||
				footerMobileRef.current?.matches(":hover")
			) {
				event.preventDefault();
			}
		});
	}, []);

	return (
		<Link
			ref={linkRef}
			zIndex={3}
			bgColor={"#131313"}
			p={2}
			borderRadius={"10px"}
			border="1px solid"
			borderColor={"transparent"}
			_hover={{
				borderColor: "white",
				textDecoration: "none",
			}}
			as={RLink}
			to={props.href}
		>
			<Stack
				alignItems={"center"}
				direction={"row"}
				justifyContent={"space-between"}
			>
				<Stack direction={"row"} alignItems={"center"} spacing={2}>
					<Image src={props.preview} w={"80px"} h="80px" />
					<Stack direction={"column"} spacing={0}>
						<Heading size={"sm"}>{props.name}</Heading>
						<Text opacity={"0.8"} fontSize={"md"}>
							{props.description}
						</Text>
						<Heading size={"sm"}>{props.price}</Heading>
					</Stack>
				</Stack>

				{(props.footer && (
					<Box display={["none", "block"]} ref={footerRef}>
						{props.footer}
					</Box>
				)) ||
					null}
			</Stack>
			{(props.footer && (
				<Box
					display={["block", "none"]}
					alignContent={"end"}
					textAlign={"end"}
					ref={footerMobileRef}
				>
					{props.footer}
				</Box>
			)) ||
				null}
		</Link>
	);
}

export default MarketplaceItemComponent;
