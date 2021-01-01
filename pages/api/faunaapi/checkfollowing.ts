import { FaunaAdminFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaAdminFunctions";

export default async (request, response) => {
	let { creatorLink, followerLink } = request.body;

	const faunadb = new FaunaAdminFunctions();

	let followingStatus = await faunadb.checkFollowing(creatorLink, followerLink);

	if (followingStatus !== "faunaError") {
		response.json({ apiResponse: followingStatus });
	}
};
