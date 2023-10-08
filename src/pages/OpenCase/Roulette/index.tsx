import { Center, Heading, Image } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import { CaseType } from "../../../types/types";
import { sleep } from "../../../utils";
import "./Roulette.css";

function Roulette({
	handleDrop,
	item,
	result,
}: {
	handleDrop: (item: any) => void;
	item: CaseType;
	result: any;
}) {
	const [properties, setProperties] = React.useState<any>();
	const [margin, setMargin] = React.useState(0);

	React.useEffect(() => {
		const getData = async () => {
			const itemWidth = 150 + 10;
			const resultIndex = _.random(40, 60);
			const innerOffset = _.random(0, 0.8);
			const data = {
				result: result.name,
				items: [
					...new Array(resultIndex)
						.fill(0)
						.map(() => item.items[_.random(0, item.items.length - 1)]),
					result,
					...new Array(4)
						.fill(0)
						.map(() => item.items[_.random(0, item.items.length - 1)]),
				],
				offset: itemWidth * (resultIndex + innerOffset) - 250,
			};
			setProperties(data);
			await sleep(500);
			setMargin(-data?.offset);
			await sleep(10000);
			handleDrop(result);
		};

		getData();
	}, []);

	return (
		<div className={"Roulette-Container"}>
			<div className={"Roulette-Display"}>
				<div className={"Roulette-Screen"} />
				<div className={"Roulette-Divider"} />
				<div className={"Roulette-Roller"} style={{ marginLeft: margin }}>
					{properties?.items?.map((item: any, i: any) => (
						<>
							{(item?.preview && (
								<Image
									border="1px solid #202020"
									id={`case-item-${i}`}
									className="Roulette-Roller-Item"
									w="150px"
									h="150px"
									src={`https://api.silentclient.net${item.preview}`}
								/>
							)) || (
								<Center
									border="1px solid #202020"
									id={`case-item-${i}`}
									h="150px"
									w="150px"
									className="Roulette-Roller-Item"
								>
									<Heading textAlign={"center"} w="150px">
										{item?.name || "Unknown"}
									</Heading>
								</Center>
							)}
						</>
					))}
				</div>
			</div>
		</div>
	);
}

export default Roulette;
