import { FaunaAdminFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaAdminFunctions";
import { PostShape } from "../../../lib/ts/interfaces";

export default async (request, response) => {
	const newPost: PostShape = request.body;

	const { FMAIL, FID } = request.cookies;

	if (FMAIL && FID) {
		const faunaDb = new FaunaAdminFunctions();
		let postResponse = await faunaDb.createPost(newPost, FID, FMAIL);

		postResponse === "postCreated"
			? response.send(postResponse)
			: response.json({ apiResponse: "Unauthorized" });
	} else {
		response.status(401).send(JSON.stringify({ apiResponse: "Unauthorized" }));
	}
};
