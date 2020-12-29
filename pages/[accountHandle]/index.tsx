import axios from "axios";
import { useEffect, useState } from "react";
import { useReauthorizeUser } from "../../lib/hooks/react";
import Navbar from "../../components/Navbar/Navbar";
import PostCard from "../../components/UiCards/PostCard";
import dashboardStyles from "./accountDashboard.module.scss";
import reauthenticate from "../api/faunaapi/reauthenticate";

export default function AccountDashboard() {
	useReauthorizeUser();

	const [feed, setFeed] = useState(() => null);

	const getPosts = async () => {
		await axios.get("/api/faunaapi/getposts").then((response) => {
			setFeed(() => response.data["apiResponse"]);
		});
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className={dashboardStyles.accountDashboard}>
			<Navbar />

			<main className={dashboardStyles.feed}>
				<div className={dashboardStyles.feedItems}>
					{feed && feed.map((feedItem) => <PostCard post={feedItem} />)}
				</div>
			</main>
		</div>
	);
}
