import { FaunaClientFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaClientFunctions";

export default async (request, response) => {
	const { FMAIL, FID } = request.cookies;

	if (FMAIL && FID) {
		const faunaDb = new FaunaClientFunctions(FID);

		await faunaDb
			.getAccount(FMAIL)
			.then((apiResponse) => {
				if (apiResponse === "apiError") {
					response
						.status(500)
						.send(JSON.stringify({ apiResponse: apiResponse }));
				} else {
					response.send(JSON.stringify({ apiResponse: apiResponse }));
				}
			})
			.catch((apiError) => response.status(500).json(apiError));
	}
};
