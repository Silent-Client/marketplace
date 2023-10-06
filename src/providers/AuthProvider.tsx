import axios from "axios";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "./AppContext";

function AuthProvider() {
	const [searchParams, setSearchParams] = useSearchParams();
	const context = useContext(AppContext);

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

	return <div></div>;
}

export default AuthProvider;
