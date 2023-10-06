import axios from "axios";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useState,
} from "react";
import { User } from "../types/types";

export type ContextProps = User & { isLoading: boolean };

export type AppContextType = {
	props: ContextProps;
	setProps?: Dispatch<SetStateAction<ContextProps>>;
	updateUser: () => void;
};

const AppContext = createContext<AppContextType>({
	props: {
		accessToken: null,
		account: null,
		isLoading: true,
	},
	updateUser: async () => {},
});

export default function AppProvider({ children }: { children: ReactNode }) {
	const [props, setProps] = useState<ContextProps>({
		accessToken: null,
		account: null,
		isLoading: true,
	});

	return (
		<AppContext.Provider
			value={{
				props,
				setProps,
				updateUser: async () => {
					if (!props.accessToken) {
						return;
					}
					try {
						const { data } = await axios.get(
							"https://api.silentclient.net/account",
							{ headers: { Authorization: `Bearer ${props.accessToken}` } }
						);
						setProps({
							account: data.account,
							accessToken: props.accessToken,
							isLoading: false,
						});
					} catch (error) {}
				},
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export { AppContext };
