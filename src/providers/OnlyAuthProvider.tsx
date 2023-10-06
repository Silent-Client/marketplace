import { useContext } from "react";
import { AppContext } from "./AppContext";

function OnlyAuthProvider({ children }: any) {
	const context = useContext(AppContext);
	if (!context.props.account) {
		window.location.href = `https://auth.silentclient.net/login?redirect_url=${window.location.href}`;
	}

	return context.props.account ? children : <></>;
}

export default OnlyAuthProvider;
