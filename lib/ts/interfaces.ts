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

//AUTHENTICATION
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

export interface GlobalContextReducerAction {
	type: "UPDATE" | "CLEAR";
	payload?: { userEmail: string; userLink: string; userName: string };
}
