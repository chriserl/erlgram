import { FaunaClientFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaClientFunctions";

export default async (request, response) => {
	const { FMAIL, FID } = request.cookies;

	if (FMAIL && FID) {
		const faunaDb = new FaunaClientFunctions(FID);

		let accountResponse = await faunaDb.getAccount(FMAIL);

		if (
			accountResponse.account === "Unauthorized" ||
			accountResponse.stats === "Unauthorized"
		) {
			response.send(JSON.stringify({ apiResponse: "Unauthorized" }));
		} else {
			response.send(JSON.stringify({ apiResponse: accountResponse }));
		}
	}
};
