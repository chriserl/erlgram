import React, { useReducer, useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../Contexts/GlobalContext";
import SignInCard from "../../components/UiCards/SignInCard";
import { SignInData } from "../../lib/ts/interfaces";
import SignUpCard from "../../components/UiCards/SignUpCard";
import PostModal from "../../components/UiCards/PostModal";
import navbarStyles from "./navbar.module.scss";
import Brand from "../UiCards/Brand";

interface accountCardAction {
	type?: "SIGNIN" | "SIGNUP";
}

export default function Navbar() {
	let [newPostCard, setNewPostCard] = useState(() => "postCardHidden");

	let [GlobalState, dispatchGlobalState] = useContext(GlobalContext);

	console.log(GlobalState);

	const signIn = async (signInData: SignInData) => {
		await axios
			.post("api/faunaapi/signin", signInData)
			.then((apiResponse) =>
				dispatchGlobalState({
					type: "UPDATE",
					payload: { ...apiResponse.data["apiResponse"] },
				})
			)
			.catch((apiError) => console.error(apiError));

		accountCardDispatch({});
	};

	const toggleNewPostCard = () => {
		setNewPostCard(() =>
			newPostCard === "postCardHidden" ? "postCardVisible" : "postCardHidden"
		);
	};

	const accountCardReducer = (
		currentState: string,
		action: accountCardAction
	) => {
		return !action.type ? "noCard" : action.type;
	};

	let [accountCard, accountCardDispatch] = useReducer(
		accountCardReducer,
		"noCard"
	);

	return (
		<React.Fragment>
			{accountCard === "SIGNIN" && (
				<SignInCard
					emptyAccountAction={(action: accountCardAction) =>
						accountCardDispatch(action)
					}
					signInAction={(signInData: SignInData) => signIn(signInData)}
				/>
			)}

			{accountCard === "SIGNUP" && (
				<SignUpCard
					emptyAccountAction={(action: accountCardAction) =>
						accountCardDispatch(action)
					}
				/>
			)}

			{newPostCard === "postCardVisible" && (
				<PostModal closeCard={() => toggleNewPostCard()} />
			)}
			<nav className={navbarStyles.nav}>
				<Brand />

				<form className={navbarStyles.navForm}>
					<div className="search-control">
						<input
							type="search"
							className="search-input"
							placeholder="search"
						/>
					</div>
				</form>
				<ul className={navbarStyles.navItems}>
					<li className={navbarStyles.navItem}>
						<button className="light-icon-button">
							<span className="bi-bell small-icon"></span>
						</button>
					</li>
					<li className={navbarStyles.navItem}>
						<button
							className="primary-icon-button-bordered"
							onClick={() => toggleNewPostCard()}
						>
							<span className="bi-camera-fill small-icon"></span>
						</button>
					</li>
					<li className={navbarStyles.navItem}>
						<button
							className="light-icon-button-bordered"
							onClick={() => accountCardDispatch({ type: "SIGNIN" })}
						>
							<span className="bi-at regular-icon"></span>
						</button>
					</li>
				</ul>
			</nav>
		</React.Fragment>
	);
}
