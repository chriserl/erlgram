import Link from "next/link";
import React, { useReducer, useState } from "react";
import SignIn from "../../components/UiCards/SignInCard";
import SignUp from "../../components/UiCards/SignUpCard";
import PostModal from "../../components/UiCards/PostModal";
import navbarStyles from "./navbar.module.scss";
import Brand from "../UiCards/Brand";

interface accountCardAction {
	type: "SIGNIN" | "SIGNUP";
}

export default function Navbar() {
	let [newPostCard, setNewPostCard] = useState(() => "postCardHidden");

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
				<SignIn
					emptyAccountAction={(action: accountCardAction) =>
						accountCardDispatch(action)
					}
				/>
			)}

			{accountCard === "SIGNUP" && (
				<SignUp
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
