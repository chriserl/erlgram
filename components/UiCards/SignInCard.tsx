import { useReducer } from "react";
import { SignInData } from "../../lib/ts/interfaces";

interface formAction {
	type: "USERNAME" | "PASSWORD";
	payload: string;
}

export default function SignInCard({ emptyAccountAction, signInAction }) {
	const formReducer = (
		prevState: SignInData,
		action: formAction
	): SignInData => {
		switch (action.type) {
			case "USERNAME": {
				return { ...prevState, userEmail: action.payload };
			}

			case "PASSWORD": {
				return { ...prevState, credentials: { password: action.payload } };
			}
		}
	};

	let [formState, formStateDispatch] = useReducer(formReducer, {
		userEmail: "",
		credentials: { password: "" },
	});

	const handleSubmit = (submitEvent) => {
		submitEvent.preventDefault();
		signInAction({ SignInData: { ...formState } });
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
						className={"bi-hexagon medium-icon brand-icon brandIcon"}
					></span>
					<h4 className="brandName">erlgram</h4>
				</a>

				<form className="signin-form" onSubmit={(event) => handleSubmit(event)}>
					<div className="text-control">
						<span className="bi-envelope small-icon"></span>
						<input
							value={formState.userEmail}
							onChange={(event) =>
								formStateDispatch({
									type: "USERNAME",
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

					<button className="primary-button pxm sign-in-button" type="submit">
						Sign in
					</button>

					<p className="px alt-text">
						No account?
						<button
							className="link-button pxm"
							onClick={() => emptyAccountAction({ type: "SIGNUP" })}
						>
							create account
						</button>
					</p>
				</form>
			</div>
		</div>
	);
}
