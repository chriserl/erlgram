import { useReducer } from "react";
import { SignUpData } from "../../lib/ts/interfaces";

interface formAction {
	type: "USERNAME" | "USERLINK" | "EMAIL" | "PASSWORD";
	payload: string;
}

export default function SignUpCard({ emptyAccountAction, signUpAction }) {
	const formReducer = (
		prevState: SignUpData,
		action: formAction
	): SignUpData => {
		switch (action.type) {
			case "USERNAME": {
				return {
					...prevState,
					data: {
						...prevState.data,
						account: { ...prevState.data.account, userName: action.payload },
					},
				};
			}

			case "USERLINK": {
				return {
					...prevState,
					data: {
						...prevState.data,
						account: { ...prevState.data.account, userLink: action.payload },
					},
				};
			}

			case "EMAIL": {
				return {
					...prevState,
					data: {
						...prevState.data,
						account: { ...prevState.data.account, userEmail: action.payload },
					},
				};
			}

			case "PASSWORD": {
				return { ...prevState, credentials: { password: action.payload } };
			}
		}
	};

	let [formState, formStateDispatch] = useReducer(formReducer, {
		credentials: {
			password: "",
		},
		data: {
			account: {
				userName: "",
				userLink: "",
				userEmail: "",
			},
		},
	});

	const handleSubmit = (submitEvent) => {
		submitEvent.preventDefault();
		signUpAction({ SignUpData: { ...formState } });
	};

	return (
		<div className="signin-card-container">
			<div className="signin-card">
				<div className="close-icon-container">
					<button
						className="light-icon-button close-icon"
						onClick={() => emptyAccountAction({ type: "noCard" })}
					>
						<span className="small-icon bi-x"></span>
					</button>
				</div>

				<a className="brand">
					<span
						className={"bi-instagram regular-icon brand-icon brandIcon"}
					></span>
					<h5 className="brandName">Erlgram</h5>
				</a>

				<form className="signin-form" onSubmit={(event) => handleSubmit(event)}>
					<div className="text-control">
						<span className="bi-person small-icon"></span>
						<input
							value={formState.data.account.userName}
							onChange={(event) =>
								formStateDispatch({
									type: "USERNAME",
									payload: event.target.value,
								})
							}
							type="text"
							className="username text-input"
							placeholder="Name"
							required
						/>
					</div>

					<div className="text-control">
						<span className="bi-at small-icon"></span>
						<input
							value={formState.data.account.userLink}
							onChange={(event) =>
								formStateDispatch({
									type: "USERLINK",
									payload: event.target.value,
								})
							}
							type="text"
							className="username text-input"
							placeholder="Username"
							required
						/>
					</div>

					<div className="text-control">
						<span className="bi-envelope-fill small-icon"></span>
						<input
							value={formState.data.account.userEmail}
							onChange={(event) =>
								formStateDispatch({
									type: "EMAIL",
									payload: event.target.value,
								})
							}
							type="email"
							className="user-email text-input"
							placeholder="Email"
							required
						/>
					</div>

					<div className="text-control">
						<span className="bi-lock small-icon"></span>
						<input
							value={formState.credentials.password}
							onChange={(event) =>
								formStateDispatch({
									type: "PASSWORD",
									payload: event.target.value,
								})
							}
							type="password"
							className="user-password text-input"
							placeholder="Password"
							required
						/>
					</div>

					<button className="primary-button pxb sign-in-button" type="submit">
						Create account
					</button>

					<p className="px alt-text">
						Already have an account?
						<button
							className="link-button pxb"
							onClick={() => emptyAccountAction({ type: "SIGNIN" })}
						>
							sign in
						</button>
					</p>
				</form>
			</div>
		</div>
	);
}
