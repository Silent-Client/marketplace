import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "./AppContext";

function OnlyAuthProvider() {
	const context = useContext(AppContext);
	if (!context.props.account) {
		window.location.href = `https://auth.silentclient.net/login?redirect_url=${window.location.href}`;
	}

	return context.props.account ? <Outlet /> : <></>;
}

export default OnlyAuthProvider;
