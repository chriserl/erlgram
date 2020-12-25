import React, { useReducer, useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "../../Contexts/GlobalContext";
import SignInCard from "../../components/UiCards/SignInCard";
import { SignInData, SignUpData, PostShape } from "../../lib/ts/interfaces";
import SignUpCard from "../../components/UiCards/SignUpCard";
import PostModal from "../../components/UiCards/PostModal";
import navbarStyles from "./navbar.module.scss";
import Brand from "../UiCards/Brand";

interface accountCardAction {
	type?: "SIGNIN" | "SIGNUP";
}

interface NavbarProps {
	cardControl?: accountCardAction;
}

interface PostFormShape {
	image: string;
	caption: string;
}

export default function Navbar({ cardControl }: NavbarProps) {
	let [newPostCard, setNewPostCard] = useState(() => "postCardHidden");

	let [GlobalState, dispatchGlobalState] = useContext(GlobalContext);

	const reAuthenticate = async () => {
		await axios
			.get("/api/faunaapi/reauthenticate")
			.then((apiResponse) =>
				dispatchGlobalState({
					type: "UPDATE",
					payload: { ...apiResponse.data["apiResponse"] },
				})
			)
			.catch((apiError) => console.error(apiError));
	};

	const signIn = async (signInData: SignInData) => {
		await axios
			.post("/api/faunaapi/signin", signInData)
			.then((apiResponse) =>
				dispatchGlobalState({
					type: "UPDATE",
					payload: { ...apiResponse.data["apiResponse"] },
				})
			)
			.catch((apiError) => console.error(apiError));

		accountCardDispatch({});
	};

	const signUp = async (signUpData: SignUpData) => {
		await axios
			.post("/api/faunaapi/signup", signUpData)
			.then((apiResponse) =>
				dispatchGlobalState({
					type: "UPDATE",
					payload: { ...apiResponse.data["apiResponse"] },
				})
			)
			.catch((apiError) => console.error(apiError));

		accountCardDispatch({});
	};

	const createPost = async (postData: PostFormShape) => {
		const timestamp = Date.now();
		const post: PostShape = {
			data: {
				...postData,
				timestamp,
				likes: 0,
				saves: 0,
				author: {
					link: GlobalState.account.userLink,
					name: GlobalState.account.userName,
				},
			},
		};

		await axios
			.post("/api/faunaapi/createpost", post)
			.then((apiResponse) => console.log(apiResponse))
			.catch((apiError) => console.error(apiError));

		toggleNewPostCard();
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

	useEffect(() => {
		//reAuthenticate();
		accountCardDispatch(cardControl);
	}, [cardControl]);

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
					signUpAction={(signUpData: SignUpData) => signUp(signUpData)}
				/>
			)}

			{newPostCard === "postCardVisible" && (
				<PostModal
					closeCard={() => toggleNewPostCard()}
					createPostAction={(postData: PostFormShape) => createPost(postData)}
				/>
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
