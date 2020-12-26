import { FaunaAdminFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaAdminFunctions";

export default async (request, response) => {
	const faunadb = new FaunaAdminFunctions();

	let creator = await faunadb.getAccountByLink(request.body["creatorLink"]);

	response.send(creator);
};
