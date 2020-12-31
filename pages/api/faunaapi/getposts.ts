import { FaunaClientFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaClientFunctions";

export default async (request, response) => {
	const { FMAIL, FID } = request.cookies;

	if (FMAIL && FID) {
		const faunaDb = new FaunaClientFunctions(FID);

		let postData = await faunaDb.getPosts(FMAIL);

		if (postData === "Unauthorized") {
			response.status(500).send(JSON.stringify({ apiResponse: postData }));
		} else {
			response.send(JSON.stringify({ apiResponse: postData }));
		}
	}
};
