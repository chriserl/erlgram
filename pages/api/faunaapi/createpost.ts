import { FaunaAdminFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaAdminFunctions";
import { PostShape } from "../../../lib/ts/interfaces";

export default async (request, response) => {
	const newPost: PostShape = request.body;
	const { FMAIL, FID } = request.cookies;
	if (FMAIL && FID) {
		const faunaDb = new FaunaAdminFunctions();
		faunaDb.createPost(newPost, FID, FMAIL);
	} else {
		response
			.status(401)
			.send(JSON.stringify({ apiResponse: "Not Authorized" }));
	}
};
