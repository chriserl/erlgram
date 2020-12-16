import Navbar from "../../components/Navbar/Navbar";
import dashboardStyles from "./accountDashboard.module.scss";

export default function AccountDashboard() {
	const posts = [
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof1.jpg",
		},
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof2.jpg",
		},
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof3.jpg",
		},
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof4.jpg",
		},
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof5.jpg",
		},
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof6.jpg",
		},
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof7.jpg",
		},
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof8.jpg",
		},
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof9.jpg",
		},
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof10.jpg",
		},
		{
			link: "@amy_bra..",
			likes: 12,
			comments: 234,
			postImage: "/images/profileimages/prof11.jpg",
		},
		{
			link: "@amy_bra..",
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

	return (
		<div className={dashboardStyles.accountDashboard}>
			<Navbar />

			<main className={dashboardStyles.feed}>
				<h6 className={dashboardStyles.sectionTitle}>Feed</h6>

				<div className={dashboardStyles.feedItems}>
					{posts.map((post) => (
						<span className="feed-card plb">
							<img
								src={post.postImage}
								alt="feed image"
								className="feed-image"
							/>
							<div className="feed-controls">
								<div className="post-user">
									<p className="post-user-link psb">{post.link}</p>
								</div>
								<div className="actions">
									<div className="like">
										<span className="small-icon bi-heart like-icon"></span>
										<p className="like-count ps">{post.likes}</p>
									</div>
									<div className="comment">
										<span className="small-icon bi-chat comment-icon"></span>
										<p className="comment-count ps">{post.comments}</p>
									</div>
								</div>
							</div>
						</span>
					))}
				</div>
			</main>
		</div>
	);
}
