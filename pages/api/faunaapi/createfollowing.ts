import { createFollowing } from "../../../lib/ts/interfaces";
import { FaunaAdminFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaAdminFunctions";

export default async (request, response) => {
	const createFollowingData: createFollowing = request.body;
	const { FMAIL, FID } = request.cookies;

	if (FMAIL && FID) {
		const faunaDb = new FaunaAdminFunctions();
		const isAuthorized = await faunaDb.isAuthorized(FID);

		isAuthorized && (await faunaDb.createFollowing(createFollowingData, FID));
	} else {
		response
			.status(401)
			.send(JSON.stringify({ apiResponse: "Not Authorized" }));
	}
};
