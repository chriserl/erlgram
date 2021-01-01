import axios from "axios";
import { useEffect, useContext } from "react";
import { GlobalContext } from "../../Contexts/GlobalContext";

const useFetch = async (fetchUrl: string, fetchBody?: object) =>
	await axios
		.post(`/api/${fetchUrl}`, fetchBody)
		.then((fetchData) => fetchData.data["apiResponse"])
		.catch((apiError) => apiError);

const useReauthorizeUser = () => {
	let [GlobalState, dispatchGlobalState] = useContext(GlobalContext);

	const reAuthenticate = async () => {
		await axios
			.get("/api/faunaapi/reauthenticate")
			.then(
				(apiResponse) =>
					apiResponse.data["apiResponse"] !== "Unauthorized" &&
					dispatchGlobalState({
						type: "UPDATE",
						payload: { ...apiResponse.data["apiResponse"], authorized: true },
					})
			)
			.catch((apiError) => console.error(apiError));
	};

	useEffect(() => {
		!GlobalState.authorized && reAuthenticate();
	}, []);
};

export { useReauthorizeUser, useFetch };
