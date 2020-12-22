import Navbar from "../../components/Navbar/Navbar";
import Link from "next/link";
import homeStyles from "./home.module.scss";

export default function Home() {
	return (
		<div className={homeStyles.home}>
			<Navbar />

			<main>
				<div className={homeStyles.imageArea}>
					<img
						src="/images/hdimage.png"
						alt="Image of Instagram redesign"
						className={homeStyles.hdImage}
					/>
				</div>
				<div className={homeStyles.infoArea}>
					<h3 className={homeStyles.mainText}>
						Experience the new flavour of Instagram
					</h3>
					<p className={`ps ${homeStyles.auxText}`}>
						More functional and beautiful design. <br />
						Your life becomes more pleasant.
					</p>
					<Link href="./feed">
						<a>
							<button className="primary-button pxm">Upgrade now</button>
						</a>
					</Link>
				</div>
			</main>
		</div>
	);
}
