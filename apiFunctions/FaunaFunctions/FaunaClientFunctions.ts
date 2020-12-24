import * as faunadb from "faunadb";

export class FaunaClientFunctions {
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
}
