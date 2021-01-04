import axios from "axios";
import { useRouter } from "next/router";
import { useState, useContext, useEffect, useReducer } from "react";
import { createFollowing } from "../../../lib/ts/interfaces";
import { GlobalContext } from "../../../Contexts/GlobalContext";
import { useReauthorizeUser, useFetch } from "../../../lib/hooks/react";
import Navbar from "../../../components/Navbar/Navbar";
import profileStyles from "./profile.module.scss";

interface profileData {
	account?: { userEmail?: string; userLink?: string; userName?: string };
	stats?: {
		postsCount?: string;
		followersCount?: number;
		followingCount?: number;
	};
}

interface profileDataAction {
	type: "FOLLOW" | "UNFOLLOW" | "UPDATE";
	payload?: profileData;
}

export default function UserProfile() {
	const router = useRouter();

	const userHandle = useRouter().asPath;

	let creator: string;

	useReauthorizeUser();

	let [GlobalState, dispatchGlobalState] = useContext(GlobalContext);

	let [isFollowing, setIsFollowing] = useState(() => false);

	const createFollowing = async (followingData: createFollowing) => {
		await axios
			.post("/api/faunaapi/createfollowing", followingData)
			.then((apiResponse) => apiResponse)
			.catch((apiError) => console.error(apiError));
	};

	const profileDataReducer = (
		oldProfileData: profileData,
		action: profileDataAction
	): profileData => {
		switch (action.type) {
			case "UPDATE":
				return { ...action.payload };

			case "FOLLOW":
				if (GlobalState.account) {
					GlobalState.account.userLink &&
						createFollowing({
							creatorLink: userHandle.slice(9),
							followerLink: GlobalState.account.userLink,
						});
					console.log(isFollowing);
					setIsFollowing(() => true);
				}
				return oldProfileData;

			case "UNFOLLOW":
				if (GlobalState.account) {
					GlobalState.account.userLink &&
						createFollowing({
							creatorLink: userHandle.slice(9),
							followerLink: GlobalState.account.userLink,
						});
					console.log(isFollowing);

					setIsFollowing(() => false);
				}
				return oldProfileData;
		}
	};

	const [profileData, dispatchProfileData] = useReducer(profileDataReducer, {});

	const getProfile = async (creatorLink: string) => {
		await axios
			.post("/api/faunaapi/getprofile", {
				creatorLink,
			})
			.then((apiResponse) => {
				dispatchProfileData({ type: "UPDATE", payload: apiResponse.data });
			})
			.catch((apiError) => console.error(apiError));
	};

	async function getFollowingStatus(creatorLink: string, followerLink: string) {
		const following = await useFetch("faunaapi/checkfollowing", {
			creatorLink: creatorLink,
			followerLink: followerLink,
		});

		following === true && setIsFollowing(() => true);
	}

	useEffect(() => {
		if (router.asPath !== router.route) {
			creator = router.query["userHandle"] as string;

			getProfile(creator);

			GlobalState.account &&
				getFollowingStatus(creator, GlobalState.account.userLink);
		}
	}, [GlobalState, isFollowing]);

	return (
		<div className={profileStyles.userProfile}>
			<Navbar />

			{profileData.account && (
				<div className={profileStyles.summaryContainer}>
					<div className={profileStyles.summaryContent}>
						<h5 className={` ${profileStyles.profileName}`}>
							{profileData.account.userName}
						</h5>
					</div>
					<div className={profileStyles.profileSummary}>
						{/* <div className={profileStyles.profileImageContainer}>
							<img
								src="/images/profileimages/jade.jpg"
								alt="profile"
								className={profileStyles.profileImage}
							/>
						</div> */}
						<button
							className={`light-icon-button ${profileStyles.profileIconButton}`}
						>
							<span className={`bi-at ${profileStyles.profileIcon}`}></span>
						</button>

						<div className={profileStyles.profileDetails}>
							<div className={profileStyles.profileStats}>
								<span className={profileStyles.stat}>
									<h6 className={` ${profileStyles.postsNumber}`}>
										{profileData.stats.postsCount}
									</h6>
									<p className="psm stat-name">Posts</p>
								</span>
								<span className={profileStyles.stat}>
									<h6 className="followers-number">
										{profileData.stats.followersCount}
									</h6>
									<p className="psm stat-name">Followers</p>
								</span>
								<span className={profileStyles.stat}>
									<h6 className="following-number">
										{profileData.stats.followingCount}
									</h6>
									<p className="psm stat-name">Following</p>
								</span>
							</div>

							<button
								className={`psm ${
									isFollowing ? "secondary-button" : "primary-button"
								} ${profileStyles.followButton}`}
								onClick={() =>
									dispatchProfileData({
										type: isFollowing === true ? "UNFOLLOW" : "FOLLOW",
									})
								}
							>
								{isFollowing ? "Unfollow" : "Follow"}
							</button>
						</div>
					</div>
				</div>
			)}

			<div className={profileStyles.userPosts}></div>
		</div>
	);
}

export async function getServerSideProps() {
	return { props: {} };
}
