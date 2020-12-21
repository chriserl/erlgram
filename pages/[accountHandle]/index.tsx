import { useReducer, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/UiCards/PostCard";
import SignIn from "../../components/UiCards/SignInCard";
import SignUp from "../../components/UiCards/SignUpCard";
import PostModal from "../../components/UiCards/PostModal";
import dashboardStyles from "./accountDashboard.module.scss";

interface accountCardAction {
	type: "SIGNIN" | "SIGNUP";
}

export default function AccountDashboard() {
	const posts = [
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof1.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof2.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof3.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof4.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof5.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof6.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof7.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof8.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof9.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof10.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof11.jpg",
		},
		{
			link: "amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof12.jpg",
		},
		{
			link: "@mieke..",
			likes: 13,
			comments: 234,
			postImage: "/images/profileimages/prof13.jpg",
		},
	];

	const accountCardReducer = (
		currentState: string,
		action: accountCardAction
	) => {
		return !action.type ? "noCard" : action.type;
	};

	const toggleNewPostCard = () => {
		setNewPostCard(() =>
			newPostCard === "postCardHidden" ? "postCardVisible" : "postCardHidden"
		);
	};

	let [accountCard, accountCardDispatch] = useReducer(
		accountCardReducer,
		"noCard"
	);

	let [newPostCard, setNewPostCard] = useState(() => "postCardHidden");

	return (
		<div className={dashboardStyles.accountDashboard}>
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

			<Navbar
				showPostCard={() => toggleNewPostCard()}
				emptyAccountAction={(action: accountCardAction) =>
					accountCardDispatch(action)
				}
			/>

			<main className={dashboardStyles.feed}>
				<div className={dashboardStyles.feedItems}>
					{posts.map((post) => (
						<PostCard post={post} />
					))}
				</div>
			</main>
		</div>
	);
}
