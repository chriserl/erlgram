import axios from "axios";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { createFollowing } from "../../../lib/ts/interfaces";
import { GlobalContext } from "../../../Contexts/GlobalContext";
import { useReauthorizeUser, useFetch } from "../../../lib/hooks/react";
import Navbar from "../../../components/Navbar/Navbar";
import profileStyles from "./profile.module.scss";
import { get } from "https";

interface profileData {
	account?: { userEmail?: string; userLink?: string; userName?: string };
	stats?: {
		postsCount?: string;
		followersCount?: string;
		followingCount?: string;
	};
}

export default function UserProfile() {
	const router = useRouter();

	useReauthorizeUser();

	let [GlobalState, dispatchGlobalState] = useContext(GlobalContext);

	let [isFollowing, setIsFollowing] = useState(() => false);

	const [profileData, setProfileData] = useState<profileData>({});

	const userHandle = useRouter().asPath;

	let creator: string;

	const createFollowing = async (followingData: createFollowing) => {
		await axios
			.post("/api/faunaapi/createfollowing", followingData)
			.then((apiResponse) => apiResponse)
			.catch((apiError) => console.error(apiError));
	};

	const handleFollowing = () => {
		if (GlobalState.account.userLink) {
			GlobalState.account.userLink &&
				createFollowing({
					creatorLink: userHandle.slice(9),
					followerLink: GlobalState.account.userLink,
				});
			setIsFollowing(() => (isFollowing === true ? false : true));
		}
	};

	const getProfile = async (creatorLink: any) => {
		await axios
			.post("/api/faunaapi/getprofile", {
				creatorLink,
			})
			.then((apiResponse) => {
				setProfileData(() => apiResponse.data);
			})
			.catch((apiError) => console.error(apiError));
	};

	async function getFollowingStatus(creatorLink: string, followerLink: string) {
		const following = await useFetch("faunaapi/checkfollowing", {
			creatorLink: "chriserl",
			followerLink: "braimah",
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
	}, [GlobalState]);

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
						<div className={profileStyles.profileImageContainer}>
							<img
								src="/images/profileimages/jade.jpg"
								alt="profile"
								className={profileStyles.profileImage}
							/>
						</div>

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
								className={`${
									isFollowing ? "secondary-button psb" : "primary-button psb"
								} ${profileStyles.followButton}`}
								onClick={() => handleFollowing()}
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
