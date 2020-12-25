import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import homeStyles from "./home.module.scss";

export default function Home() {
	return (
		<div className={homeStyles.homeContainer}>
			<Navbar />
			<div className={homeStyles.home}>
				<div>
					<span
						className={`large-icon bi-hexagon brand-icon ${homeStyles.brandIcon}`}
					></span>
					<div className={homeStyles.textContent}>
						<p className={`plb ${homeStyles.auxText}`}>
							experience the new flavour of instagram
						</p>
						<p className={homeStyles.mainText}>erlgram</p>
					</div>
					<Link href="/braimah">
						<button className={`primary-button psm ${homeStyles.cta}`}>
							Explore
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
