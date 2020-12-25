import axios from "axios";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../../Contexts/GlobalContext";

const useReauthorizeUser = () => {
	let [GlobalState, dispatchGlobalState] = useContext(GlobalContext);

	const reAuthenticate = async () => {
		await axios
			.get("/api/faunaapi/reauthenticate")
			.then((apiResponse) =>
				dispatchGlobalState({
					type: "UPDATE",
					payload: { ...apiResponse.data["apiResponse"] },
				})
			)
			.catch((apiError) => console.error(apiError));
	};

	useEffect(() => {
		!GlobalState.account.authorized && reAuthenticate();
	}, []);
};

export { useReauthorizeUser };
