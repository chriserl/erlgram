import { useState } from "react";
import Link from "next/link";
import { PostShape } from "../../lib/ts/interfaces";

interface PostCardProps {
	post: PostShape;
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
					src={post.data.image}
					alt="post"
					className="post-image"
					onClick={() => toggleDescription()}
				/>
				<div className="post-controls">
					<Link href={`profile/${post.data.author.link}`}>
						<a className="post-user-link psb">{`@${post.data.author.link}`}</a>
					</Link>
					<div className="actions">
						<div className="like">
							<span className="regular-icon bi-heart like-icon"></span>
							<p className="like-count plb">{post.data.likes}</p>
						</div>
						<div className="save">
							<span className="regular-icon bi-bookmark save-icon"></span>
						</div>
					</div>
				</div>
				<p className={`psm ${descriptionVisibility}`}>{post.data.caption}</p>
			</div>
		</span>
	);
}
