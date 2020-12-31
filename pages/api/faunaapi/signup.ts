import { serialize } from "cookie";
import { FaunaAdminFunctions } from "../../../apiFunctions/FaunaFunctions/FaunaAdminFunctions";
import { SignUpData } from "../../../lib/ts/interfaces";

export default async (request, response) => {
	const userData: SignUpData = request.body["accountDetails"];
	const faunaDb = new FaunaAdminFunctions();

	let signUpReponse = await faunaDb.signUp(userData);

	if (signUpReponse === "faunaError") {
		response.send(JSON.stringify({ apiResponse: "apiError" }));
	} else {
		response.setHeader("Set-Cookie", [
			serialize("FID", signUpReponse["authToken"], {
				path: "/",
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
			}),
			serialize("FMAIL", userData.data.account.userEmail, {
				path: "/",
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
			}),
		]);
		response.send(
			JSON.stringify({ apiResponse: signUpReponse["userAccount"] })
		);
	}
};
