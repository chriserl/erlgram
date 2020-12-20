import { useState } from "react";

interface PostCardProps {
	post: {
		link: string;
		postImage: string;
		likes: number;
		comments: number;
	};
}

export default function PostCard({ post }: PostCardProps) {
	let [descriptionVisibility, setDescriptionVisibility] = useState(
		() => "description-invisible"
	);

	const toggleDescription = () => {
		setDescriptionVisibility((prevState) =>
			prevState === "post-description"
				? "description-invisible"
				: "post-description"
		);
	};

	return (
		<span className="post-card">
			<div className="post-card-container">
				<img
					src={post.postImage}
					alt="post"
					className="post-image"
					onClick={() => toggleDescription()}
				/>
				<div className="post-controls">
					<a href={`profile/${post.link}`} className="post-user-link psb">
						{`@${post.link}`}
					</a>
					<div className="actions">
						<div className="like">
							<span className="regular-icon bi-heart like-icon"></span>
							<p className="like-count plb">{post.likes}</p>
						</div>
						<div className="save">
							<span className="regular-icon bi-bookmark save-icon"></span>
						</div>
					</div>
				</div>
				<p className={`psm ${descriptionVisibility}`}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
					amet quisquam veritatis sapiente libero?
				</p>
			</div>
		</span>
	);
}
