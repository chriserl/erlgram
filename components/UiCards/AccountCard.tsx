import { useState } from "react";
import { GlobalAccountShape } from "../../lib/ts/interfaces";

interface AccountCardProps {
	accountData: GlobalAccountShape;
}

export default function AccountCard({ accountData }: AccountCardProps) {
	const [modalState, setModalState] = useState(() => "noModal");

	const toggleModal = () => {
		setModalState(() =>
			modalState === "noModal" ? "accountModal" : "noModal"
		);
	};

	return (
		<div className="account-card-container">
			<div className={`account-card ${modalState}`}>
				<div className="control-container">
					<button
						className="light-icon-button-bordered control-button"
						onClick={() => toggleModal()}
					>
						<span className="bi-at regular-icon"></span>
					</button>
				</div>

				<div className="account-content">
					<span className={"bi-at large-icon at-icon"}></span>

					<div className="main-content">
						<p className="plb">{accountData.account.userName}</p>
						<p className="psm">{`@${accountData.account.userLink}`}</p>

						<div className="stats">
							<span className="stat">
								<p className="plb">{accountData.stats.postsCount}</p>
								<p className="pxm stat-name">Posts</p>
							</span>
							<span className="stat">
								<p className="followers-number plb">
									{accountData.stats.followersCount}
								</p>
								<p className="pxm stat-name">Followers</p>
							</span>
							<span className="stat">
								<p className="following-number plb">
									{accountData.stats.followingCount}
								</p>
								<p className="pxm stat-name">Following</p>
							</span>
						</div>

						<div className="cta">
							<button className="secondary-button psb">sign out</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
