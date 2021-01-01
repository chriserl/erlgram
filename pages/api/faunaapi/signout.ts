import { FaunaClientFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaClientFunctions";

export default async (request, response) => {
	const { FMAIL, FID } = request.cookies;

	const faunaDb = new FaunaClientFunctions(FID);

	faunaDb.signOut();
};
