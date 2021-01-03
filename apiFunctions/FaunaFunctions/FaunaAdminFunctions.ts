import * as faunadb from "faunadb";
import {
	SignInData,
	SignUpData,
	PostShape,
	createFollowing,
} from "../../lib/ts/interfaces";

const {
	Update,
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
	Foreach,
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
			.catch(() => "Unauthorized");

	checkFollowing = async (creatorLink: string, followerLink: string) =>
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
			.catch(() => "faunaError");

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
							},
							stats: {
								followersCount: Add(
									Select(
										["data", "stats", "followersCount"],
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
			.catch(() => "faunaError");
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
							},
							stats: {
								followersCount: Subtract(
									Select(
										["data", "stats", "followersCount"],
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
			.catch(() => "faunaError");

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
							},
							stats: {
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
			.catch(() => "faunaError");
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
							},
							stats: {
								followingCount: Subtract(
									Select(
										["data", "stats", "followingCount"],
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
			.catch(() => "faunaError");

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
			.catch(() => "faunaError");

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
							posts: Append(
								postReference,
								Select(
									["data", "posts"],
									Get(Match(Index("search_by_email"), userEmail)),
									[]
								)
							),
							stats: {
								postsCount: Add(
									Select(
										["data", "stats", "postsCount"],
										Get(Match(Index("search_by_email"), userEmail)),
										0
									),
									1
								),
							},
						},
					}
				)
			)
			.catch(() => "faunaError");
	};

	private appendPostToFollowers = async (
		postReference: number,
		userEmail: string
	) =>
		await this.faunaClient
			.query(
				Foreach(
					Select(
						["data", "social", "followers"],
						Get(Match(Index("search_by_email"), userEmail)),
						[]
					),
					Lambda(
						"follower",
						Update(
							Select(
								"ref",
								Get(Match(Index("search_by_link"), Var("follower")))
							),
							{
								data: {
									feed: Append(
										postReference,
										Select(
											["data", "feed"],
											Get(Match(Index("search_by_link"), Var("follower"))),
											[]
										)
									),
								},
							}
						)
					)
				)
			)
			.catch(() => "faunaError");

	getAccount = async (userEmail: string) =>
		await this.faunaClient
			.query(
				Select(
					["data", "account"],
					Get(Match(Index("search_by_email"), userEmail))
				)
			)
			.then((faunaResponse) => faunaResponse)
			.catch((e) => "resourceUnavailable");

	getAccountByLink = async (accountLink: string) => {
		let account = await this.faunaClient
			.query(
				Select(
					["data", "account"],
					Get(Match(Index("search_by_link"), accountLink))
				)
			)
			.then((faunaResponse) => faunaResponse)
			.catch(() => "resourceUnavailable");

		let stats = await this.faunaClient
			.query(
				Select(
					["data", "stats"],
					Get(Match(Index("search_by_link"), accountLink))
				)
			)
			.then((faunaResponse) => faunaResponse)
			.catch(() => "resourceUnavailable");

		return { account, stats };
	};

	getAccountByEmail = async (accountEmail: string) => {
		let account = await this.faunaClient
			.query(
				Select(
					["data", "account"],
					Get(Match(Index("search_by_email"), accountEmail))
				)
			)
			.then((faunaResponse) => faunaResponse)
			.catch(() => "resourceUnavailable");

		let stats = await this.faunaClient
			.query(
				Select(
					["data", "stats"],
					Get(Match(Index("search_by_email"), accountEmail))
				)
			)
			.then((faunaResponse) => faunaResponse)
			.catch(() => "resourceUnavailable");

		return { account, stats };
	};

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
			.catch(() => "faunaError");

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
				userAccount: await this.getAccountByEmail(userCredentials.userEmail),
			}))
			.catch(() => "faunaError");

	createPost = async (postData: PostShape, userId: string, userEmail: string) =>
		new faunadb.Client({ secret: userId })
			.query(this.faunaQuery.HasCurrentToken())
			.then(
				async (res) =>
					await this.postToUserPosts(postData).catch((faunaError) => faunaError)
			)
			.then(async (postReference) => {
				await this.appendPostToCreator(postReference, userEmail);
				await this.appendPostToFollowers(postReference, userEmail);
			})
			.then(() => "postCreated")
			.catch(() => "Unauthorized");

	createFollowing = async (followingData: createFollowing, userId: string) => {
		let isFollowing = await this.checkFollowing(
			followingData.creatorLink,
			followingData.followerLink
		);

		console.log(isFollowing);

		if (!isFollowing || isFollowing === "faunaError") {
			return await this.appendFollowingToCreator(
				followingData.creatorLink,
				followingData.followerLink
			)
				.then(() =>
					this.appendFollowingToFollower(
						followingData.creatorLink,
						followingData.followerLink
					)
				)
				.catch(() => "faunaError");
		}

		if (isFollowing || isFollowing !== "faunaError") {
			return await this.removeFollowingFromCreator(
				followingData.creatorLink,
				followingData.followerLink
			)
				.then(
					async () =>
						await this.removeFollowingFromFollower(
							followingData.creatorLink,
							followingData.followerLink
						)
				)
				.catch(() => "faunaError");
		}
	};
}
