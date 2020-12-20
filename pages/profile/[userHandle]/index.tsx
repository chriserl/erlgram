import Navbar from "../../../components/Navbar/Navbar";
import profileStyles from "./profile.module.scss";

export default function UserProfile() {
	return (
		<div className={profileStyles.userProfile}>
			<Navbar />
			<div className={profileStyles.summaryContainer}>
				<div className={profileStyles.profileSummary}>
					<div className={profileStyles.profileImageContainer}>
						<img
							src="/images/profileimages/jade.jpg"
							alt="profile"
							className={profileStyles.profileImage}
						/>
					</div>

					<div className={profileStyles.summaryContent}>
						<h6 className={` ${profileStyles.profileName}`}>Unjaded Jade</h6>
						<p className={`psb ${profileStyles.profileLink}`}>@jade</p>
					</div>
				</div>
				<div className={profileStyles.profileStats}>
					<span className={profileStyles.stat}>
						<p className={`plb ${profileStyles.postsNumber}`}>46</p>
						<p className="psm stat-name">Posts</p>
					</span>
					<span className={profileStyles.stat}>
						<p className="followers-number plb">2.8k</p>
						<p className="psm stat-name">Followers</p>
					</span>
					<span className={profileStyles.stat}>
						<p className="following-number plb">526</p>
						<p className="psm stat-name">Following</p>
					</span>
				</div>

				<button className={`primary-button psm ${profileStyles.followButton}`}>
					Follow
				</button>
			</div>

			<div className={profileStyles.userPosts}></div>
		</div>
	);
}
