import React, { useReducer, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ImageKit from "imagekit-javascript";
import { GlobalContext } from "../../Contexts/GlobalContext";
import SignInCard from "../../components/UiCards/SignInCard";
import {
	SignInData,
	SignUpData,
	PostShape,
	AccountData,
} from "../../lib/ts/interfaces";
import SignUpCard from "../../components/UiCards/SignUpCard";
import AccountCard from "../../components/UiCards/AccountCard";
import PostModal from "../../components/UiCards/PostModal";
import Brand from "../UiCards/Brand";
import navbarStyles from "./navbar.module.scss";

interface accountCardAction {
	type?: "SIGNIN" | "SIGNUP";
}

interface NavbarProps {
	cardControl?: accountCardAction;
}

interface PostFormShape {
	image: File;
	caption: string;
}

let imagekit = new ImageKit({
	publicKey: "public_8ADQhfc02b69LM2ICJM1saHkuPw=",
	urlEndpoint: "https://ik.imagekit.io/erldev",
	authenticationEndpoint: "/api/imagekit/authenticate",
});

export default function Navbar({ cardControl }: NavbarProps) {
	let [newPostCard, setNewPostCard] = useState(() => "postCardHidden");

	const [accountModalState, setAccountModalState] = useState(() => "noModal");

	let [GlobalState, dispatchGlobalState] = useContext(GlobalContext);

	const toggleNewPostCard = () => {
		setNewPostCard(() =>
			newPostCard === "postCardHidden" ? "postCardVisible" : "postCardHidden"
		);
	};

	const toggleAccountModal = () => {
		setAccountModalState(() =>
			accountModalState === "noModal" ? "accountModal" : "noModal"
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

	const signIn = async (signInData: SignInData) => {
		await axios
			.post("/api/faunaapi/signin", signInData)
			.then((apiResponse) =>
				dispatchGlobalState({
					type: "UPDATE",
					payload: {
						...apiResponse.data["apiResponse"],
						authorized: true,
					},
				})
			)
			.catch((apiError) => console.error(apiError));

		accountCardDispatch({});
	};

	const signUp = async (signUpData: SignUpData) => {
		let accountDetails: AccountData = {
			...signUpData,
			...signUpData["SignUpData"],
			data: {
				...signUpData["SignUpData"]["data"],
				feed: [],
				posts: [],
				social: {
					followers: [],
					following: [],
				},
				stats: {
					postsCount: 0,
					followersCount: 0,
					followingCount: 0,
				},
			},
		};
		await axios
			.post("/api/faunaapi/signup", { accountDetails })
			.then((apiResponse) =>
				dispatchGlobalState({
					type: "UPDATE",
					payload: { ...apiResponse.data["apiResponse"], authorized: true },
				})
			)
			.catch((apiError) => console.error(apiError));

		accountCardDispatch({});
	};

	const router = useRouter();

	const signOut = async () => {
		toggleAccountModal();
		dispatchGlobalState({ type: "CLEAR" });
		router && router.push("/");

		await axios.post("/api/faunaapi/signout").catch((apiError) => apiError);
	};

	const uploadPost = async (post: PostShape) => {
		await axios
			.post("/api/faunaapi/createpost", post)
			.catch((apiError) => console.error(apiError));

		toggleNewPostCard();
	};

	const createPost = async (postData: PostFormShape) => {
		let post: PostShape;

		await imagekit.upload(
			{
				file: postData.image,
				fileName: postData.image.name,
				folder: "userposts",
			},
			(err, result) => {
				post = {
					data: {
						image: result["url"],
						caption: postData.caption,
						timestamp: Date.now(),
						likes: 0,
						saves: 0,
						author: {
							link: GlobalState.account.userLink,
							name: GlobalState.account.userName,
						},
					},
				};

				uploadPost(post);
			}
		);
	};

	useEffect(() => {
		cardControl && accountCardDispatch(cardControl);
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
					{GlobalState.authorized === false ? (
						<li className={navbarStyles.navItem}>
							<button
								className="light-icon-button-bordered"
								onClick={() => accountCardDispatch({ type: "SIGNIN" })}
							>
								<span className="bi-at regular-icon"></span>
							</button>
						</li>
					) : (
						<li className={navbarStyles.navItem}>
							<AccountCard
								accountData={GlobalState}
								toggleModal={() => toggleAccountModal()}
								modalState={accountModalState}
								signOutAction={() => signOut()}
							/>
						</li>
					)}
				</ul>
			</nav>
		</React.Fragment>
	);
}
