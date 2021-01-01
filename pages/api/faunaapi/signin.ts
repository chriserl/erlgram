import { serialize } from "cookie";
import { FaunaAdminFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaAdminFunctions";
import { SignInData } from "../../../lib/ts/interfaces";

export default async (request, response) => {
	const userCredentials: SignInData = request.body["SignInData"];
	const faunaDb = new FaunaAdminFunctions();

	let signInReponse = await faunaDb.signIn(userCredentials);

	if (signInReponse === "faunaError") {
		response.send(JSON.stringify({ apiResponse: "apiError" }));
	} else if (
		signInReponse["userAccount"]["account"] === "resourceUnavailable" ||
		signInReponse["userAccount"]["account"] === "resourceUnavailable"
	) {
		response.send(JSON.stringify({ apiResponse: "apiError" }));
	} else {
		response.setHeader("Set-Cookie", [
			serialize("FID", signInReponse["authToken"], {
				path: "/",
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
			}),
			serialize("FMAIL", userCredentials.userEmail, {
				path: "/",
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
			}),
		]);
		response.send(
			JSON.stringify({ apiResponse: signInReponse["userAccount"] })
		);
	}
};
