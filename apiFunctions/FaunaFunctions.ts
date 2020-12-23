import * as faunadb from "faunadb";
import { SignInData, SignUpData } from "../lib/ts/interfaces";

export class FaunaFunctions {
	constructor(private faunaKey: string) {}

	private faunaClient = new faunadb.Client({ secret: this.faunaKey });
	private faunaQuery = faunadb.query;

	getAccount = async (userEmail: string) =>
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

	signUp = async (userData: SignUpData) =>
		await this.faunaClient
			.query(
				this.faunaQuery.Create(
					this.faunaQuery.Collection("useraccounts"),
					userData
				)
			)
			.then(() =>
				this.signIn({
					userEmail: userData.data.account.userEmail,
					credentials: { password: userData.credentials.password },
				})
			)
			.catch(() => "apiError");

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
