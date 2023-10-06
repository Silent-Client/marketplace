import { extendTheme } from "@chakra-ui/react";
import "./css/theme.css";

export default extendTheme({
	fonts: {
		heading: `'Onest', sans-serif`,
		body: `'Onest', sans-serif`,
	},
	styles: {
		global: {
			body: {
				background: "black",
				color: "white",
			},
		},
	},
	config: {
		initialColorMode: "dark",
		useSystemColorMode: false,
		cssVarPrefix: "silentclient",
	},
	colors: {
		table: {
			700: "#1f1f1f",
		},
	},
});
