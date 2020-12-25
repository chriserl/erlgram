import * as faunadb from "faunadb";
import {
	SignInData,
	SignUpData,
	PostShape,
	createFollowing,
} from "../../lib/ts/interfaces";

const {
	Select,
	Get,
	Match,
	Index,
	Append,
	Add,
	ContainsValue,
	HasCurrentToken,
	Filter,
	Lambda,
	Equals,
	Var,
	Subtract,
	Not,
} = faunadb.query;

export class FaunaAdminFunctions {
	constructor() {}

	private faunaKey: string = process.env.FAUNA_ADMIN_KEY;
	private faunaClient = new faunadb.Client({
		secret: this.faunaKey,
	});
	private faunaQuery = faunadb.query;

	isAuthorized = async (userId: string) =>
		await new faunadb.Client({ secret: userId })
			.query(this.faunaQuery.HasCurrentToken())
			.then((response) => response)
			.catch((error) => console.log(error["description"]));

	private checkFollowing = async (creatorLink: string, followerLink: string) =>
		await this.faunaClient
			.query(
				ContainsValue(
					followerLink,
					Select(
						["data", "social", "followers"],
						Get(Match(Index("search_by_link"), creatorLink)),
						[]
					)
				)
			)
			.then((ress) => ress)
			.catch((error) => console.log(error["description"]));

	private appendFollowingToCreator = async (
		creatorLink: string,
		followerLink: string
	) => {
		await this.faunaClient
			.query(
				this.faunaQuery.Update(
					Select("ref", Get(Match(Index("search_by_link"), creatorLink))),
					{
						data: {
							social: {
								followers: Append(
									followerLink,
									Select(
										["data", "social", "followers"],
										Get(Match(Index("search_by_link"), creatorLink)),
										[]
									)
								),
								followersCount: Add(
									Select(
										["data", "social", "followersCount"],
										Get(Match(Index("search_by_link"), creatorLink)),
										0
									),
									1
								),
							},
						},
					}
				)
			)
			.catch((error) => console.log(error["description"]));
	};

	private removeFollowingFromCreator = async (
		creatorLink: string,
		followerLink: string
	) =>
		await this.faunaClient
			.query(
				this.faunaQuery.Update(
					Select("ref", Get(Match(Index("search_by_link"), creatorLink))),
					{
						data: {
							social: {
								followers: Append(
									Filter(
										Select(
											["data", "social", "followers"],
											Get(Match(Index("search_by_link"), creatorLink)),
											[]
										),
										Lambda(
											"follower",
											Not(Equals(followerLink, Var("follower")))
										)
									),
									[]
								),
								followersCount: Subtract(
									Select(
										["data", "social", "followersCount"],
										Get(Match(Index("search_by_link"), creatorLink)),
										0
									),
									1
								),
							},
						},
					}
				)
			)
			.catch((error) => console.log(error["description"]));

	private appendFollowingToFollower = async (
		creatorLink: string,
		followerLink: string
	) => {
		await this.faunaClient
			.query(
				this.faunaQuery.Update(
					Select("ref", Get(Match(Index("search_by_link"), followerLink))),
					{
						data: {
							social: {
								following: Append(
									creatorLink,
									Select(
										["data", "social", "following"],
										Get(Match(Index("search_by_link"), followerLink)),
										[]
									)
								),
								followingCount: Add(
									Select(
										["data", "social", "followingCount"],
										Get(Match(Index("search_by_link"), followerLink)),
										0
									),
									1
								),
							},
						},
					}
				)
			)
			.catch((error) => console.log(error["description"]));
	};

	private removeFollowingFromFollower = async (
		creatorLink: string,
		followerLink: string
	) =>
		await this.faunaClient
			.query(
				this.faunaQuery.Update(
					Select("ref", Get(Match(Index("search_by_link"), followerLink))),
					{
						data: {
							social: {
								following: Filter(
									Select(
										["data", "social", "following"],
										Get(Match(Index("search_by_link"), followerLink)),
										[]
									),
									Lambda(
										"following",
										Not(Equals(creatorLink, Var("following")))
									)
								),
								followingCount: Subtract(
									Select(
										["data", "social", "followingCount"],
										Get(Match(Index("search_by_link"), followerLink)),
										0
									),
									1
								),
							},
						},
					}
				)
			)
			.catch((error) => console.log(error["description"]));

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

	createFollowing = async (followingData: createFollowing, userId: string) => {
		let isFollowing = await this.checkFollowing(
			followingData.creatorLink,
			followingData.followerLink
		);

		if (!isFollowing) {
			await this.appendFollowingToCreator(
				followingData.creatorLink,
				followingData.followerLink
			)
				.then(() =>
					this.appendFollowingToFollower(
						followingData.creatorLink,
						followingData.followerLink
					)
				)
				.catch((error) => console.log(error["description"]));
		}

		if (isFollowing) {
			await this.removeFollowingFromCreator(
				followingData.creatorLink,
				followingData.followerLink
			).then(
				async () =>
					await this.removeFollowingFromFollower(
						followingData.creatorLink,
						followingData.followerLink
					)
			);
		}
	};
}
