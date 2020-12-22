import * as faunadb from "faunadb";
import { SignInData } from "../lib/ts/interfaces";

interface SignUpData {
	credentials: {
		password: string;
	};
	data: {
		account: {
			userName: string;
			userLink: string;
			userEmail: string;
		};
	};
}

export class FaunaFunctions {
	constructor(private faunaKey: string) {}

	private faunaClient = new faunadb.Client({ secret: this.faunaKey });
	private faunaQuery = faunadb.query;

	private getAccount = async (userEmail: string) =>
		await this.faunaClient
			.query(
				this.faunaQuery.Get(
					this.faunaQuery.Match(
						this.faunaQuery.Index("search_by_email"),
						userEmail
					)
				)
			)
			.then((faunaResponse) => faunaResponse["data"])
			.catch((e) => e);

	signIn = async (userCredentials: SignInData) =>
		await this.faunaClient
			.query(
				this.faunaQuery.Login(
					this.faunaQuery.Match(
						this.faunaQuery.Index("search_by_email"),
						userCredentials.userEmail
					),
					userCredentials.credentials
				)
			)
			.then(async (faunaResponse) => ({
				authToken: faunaResponse["secret"],
				userAccount: await this.getAccount(userCredentials.userEmail),
			}))
			.catch(() => "apiError");
}
