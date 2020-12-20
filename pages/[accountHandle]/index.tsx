import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/UiCards/postcard";
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
				<div className={dashboardStyles.feedItems}>
					{posts.map((post) => (
						<PostCard post={post} />
					))}
				</div>
			</main>
		</div>
	);
}
