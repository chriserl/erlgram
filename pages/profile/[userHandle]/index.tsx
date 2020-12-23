import Navbar from "../../../components/Navbar/Navbar";
import profileStyles from "./profile.module.scss";

export default function UserProfile() {
	return (
		<div className={profileStyles.userProfile}>
			<Navbar />
			<div className={profileStyles.summaryContainer}>
				<div className={profileStyles.summaryContent}>
					<h5 className={` ${profileStyles.profileName}`}>Unjaded Jade</h5>
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
								<h6 className={` ${profileStyles.postsNumber}`}>46</h6>
								<p className="psm stat-name">Posts</p>
							</span>
							<span className={profileStyles.stat}>
								<h6 className="followers-number">2.8k</h6>
								<p className="psm stat-name">Followers</p>
							</span>
							<span className={profileStyles.stat}>
								<h6 className="following-number">526</h6>
								<p className="psm stat-name">Following</p>
							</span>
						</div>

						<button
							className={`primary-button psm ${profileStyles.followButton}`}
						>
							Follow
						</button>
					</div>
				</div>
			</div>

			<div className={profileStyles.userPosts}></div>
		</div>
	);
}
