import { Center, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { errorHandler } from "../utils";
import { AppContext } from "./AppContext";

function AuthProvider({ children }: any) {
	const [searchParams, setSearchParams] = useSearchParams();
	const context = useContext(AppContext);
	const toast = useToast();

	useEffect(() => {
		const authorize = async () => {
			if (searchParams.get("access_token") && context.setProps) {
				const token = searchParams.get("access_token");
				setSearchParams({});

				if (token !== "null") {
					try {
						const { data } = await axios.get(
							"https://api.silentclient.net/account",
							{ headers: { Authorization: `Bearer ${token}` } }
						);
						context.setProps({
							account: data.account,
							accessToken: token,
							isLoading: false,
						});
					} catch (error) {
						errorHandler(error, toast);
						context.setProps({
							account: null,
							accessToken: null,
							isLoading: false,
						});
					}
				} else {
					context.setProps({
						account: null,
						accessToken: null,
						isLoading: false,
					});
				}
			} else {
				window.location.href = `https://auth.silentclient.net/login?redirect_url=${window.location.href}&force_redirect=1`;
			}
		};

		authorize();
	}, []);

	return context.props.isLoading ? (
		<Center minH="100vh">
			<Spinner size="xl" color="white" />
		</Center>
	) : (
		children
	);
}

export default AuthProvider;
