export type GlobalContextShape = [
	account: GlobalAccountShape,
	dispatchGlobalState?: any
];

export interface GlobalAccountShape {
	authorized: boolean;
	account?: { userName: string; userLink: string; userEmail: string };
	stats?: {
		postsCount: number;
		followersCount: number;
		followingCount: number;
	};
}

export interface SignInData {
	userEmail: string;
	credentials: { password: string };
}

export interface SignUpData {
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

export interface AccountData {
	credentials: {
		password: string;
	};
	data: {
		account: {
			userName: string;
			userLink: string;
			userEmail: string;
		};
		feed: [];
		posts: [];
		social: {
			followers: [];
			following: [];
		};
		stats: {
			postsCount: number;
			followersCount: number;
			followingCount: number;
		};
	};
}

export interface PostShape {
	data: {
		timestamp: number;
		image: string;
		caption: string;
		likes: number;
		saves: number;
		author: {
			link: string;
			name: string;
		};
	};
}

export interface creatorPostsUpdate {
	data: {
		social: {
			posts: number[];
		};
	};
}

export interface createFollowing {
	creatorLink: string;
	followerLink: string;
}

export interface GlobalContextReducerAction {
	type: "UPDATE" | "CLEAR";
	payload?: { userEmail: string; userLink: string; userName: string };
}
