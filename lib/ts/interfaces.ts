export type GlobalContextShape = [
	account: GlobalAccountShape,
	dispatchGlobalState?: any
];

export interface GlobalAccountShape {
	account: {
		authorized: boolean;
		userName?: string;
		userLink?: string;
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
	data: {
		account: {
			userName: string;
			userLink: string;
			userEmail: string;
		};
		social: {
			following: string[];
			followingCount: number;
			followers: string[];
			followersCount: number;
			posts: number[];
			saved: number[];
			feed: number[];
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
