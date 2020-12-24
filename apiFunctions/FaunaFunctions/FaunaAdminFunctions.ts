import * as faunadb from "faunadb";
import {
	SignInData,
	SignUpData,
	PostShape,
	creatorPostsUpdate,
} from "../../lib/ts/interfaces";

const { Select, Get, Match, Index, Append } = faunadb.query;

export class FaunaAdminFunctions {
	constructor() {}

	private faunaKey: string = process.env.FAUNA_ADMIN_KEY;
	private faunaClient = new faunadb.Client({
		secret: this.faunaKey,
	});
	private faunaQuery = faunadb.query;

	private postToUserPosts = async (postData: PostShape) =>
		await this.faunaClient
			.query(
				this.faunaQuery.Create(
					this.faunaQuery.Ref(
						this.faunaQuery.Collection("userposts"),
						postData.data.timestamp
					),
					postData
				)
			)
			.then((postDocument) => postDocument["ref"])
			.catch((faunaError) => console.log(faunaError["description"]));

	private appendPostToCreator = async (
		postReference: number,
		userEmail: string
	) => {
		await this.faunaClient
			.query(
				this.faunaQuery.Update(
					Select("ref", Get(Match(Index("search_by_email"), userEmail))),
					{
						data: {
							social: {
								posts: Append(
									postReference,
									Select(
										["data", "social", "posts"],
										Get(Match(Index("search_by_email"), userEmail)),
										[]
									)
								),
							},
						},
					}
				)
			)
			.then((ress) => console.log(ress))
			.catch((error) => console.log(error["description"]));
	};
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

	createPost = async (postData: PostShape, userId: string, userEmail: string) =>
		new faunadb.Client({ secret: userId })
			.query(this.faunaQuery.HasCurrentToken())
			.then(
				async (res) =>
					await this.postToUserPosts(postData).catch((faunaError) => faunaError)
			)
			.then((postReference) =>
				this.appendPostToCreator(postReference, userEmail)
			)
			.catch(() => "Unauthorized");
}
