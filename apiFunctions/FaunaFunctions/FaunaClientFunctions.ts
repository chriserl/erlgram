import * as faunadb from "faunadb";

const { Select, Get, Match, Index } = faunadb.query;

export class FaunaClientFunctions {
	constructor(private faunaKey: string) {}

	private faunaClient = new faunadb.Client({ secret: this.faunaKey });
	private faunaQuery = faunadb.query;

	getAccount = async (userEmail: string) =>
		await this.faunaClient
			.query(
				Select(
					["data", "account"],
					Get(Match(Index("search_by_email"), userEmail))
				)
			)
			.then((faunaResponse) => faunaResponse)
			.catch((e) => e);
}
