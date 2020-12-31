import { createFollowing } from "../../../lib/ts/interfaces";
import { FaunaAdminFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaAdminFunctions";

export default async (request, response) => {
	const createFollowingData: createFollowing = request.body;
	const { FMAIL, FID } = request.cookies;

	if (FMAIL && FID) {
		const faunaDb = new FaunaAdminFunctions();
		const isAuthorized = await faunaDb.isAuthorized(FID);

		if (isAuthorized === "Unauthorized") {
			response.json({ apiResponse: isAuthorized });
		} else {
			let followingResponse = await faunaDb.createFollowing(
				createFollowingData,
				FID
			);
			followingResponse === "faunaError"
				? response.json({ apiResponse: "apiError" })
				: response.staus(200).json({ apiResponse: "followingCreated" });
		}
	} else {
		response.status(401).send(JSON.stringify({ apiResponse: "Unauthorized" }));
	}
};
