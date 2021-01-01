import * as faunadb from "faunadb";

const { Select, Get, Match, Index, Map, Lambda, Var, Logout } = faunadb.query;

export class FaunaClientFunctions {
	constructor(private faunaKey: string) {}

	private faunaClient = new faunadb.Client({ secret: this.faunaKey });
	private faunaQuery = faunadb.query;

	getAccount = async (accountEmail: string) => {
		let account = await this.faunaClient
			.query(
				Select(
					["data", "account"],
					Get(Match(Index("search_by_email"), accountEmail))
				)
			)
			.then((faunaResponse) => faunaResponse)
			.catch((e) => "Unauthorized");

		let stats = await this.faunaClient
			.query(
				Select(
					["data", "stats"],
					Get(Match(Index("search_by_email"), accountEmail))
				)
			)
			.then((faunaResponse) => faunaResponse)
			.catch((e) => "Unauthorized");

		return { account, stats };
	};

	getPosts = async (userEmail: string) =>
		await this.faunaClient
			.query(
				Map(
					Select(
						["data", "feed"],
						Get(Match(Index("search_by_email"), userEmail))
					),
					Lambda("post", Get(Var("post")))
				)
			)
			.then((faunaResponse) => faunaResponse)
			.catch((e) => "Unauthorized");

	signOut = async () => {
		this.faunaClient.query(Logout(true)).catch(() => "faunaError");
	};
}
