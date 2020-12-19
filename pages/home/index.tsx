import homeStyles from "./home.module.scss";
import Link from "next/link";

export default function Home() {
	return (
		<div className={homeStyles.home}>
			<nav className={homeStyles.nav}>
				<Link href="/">
					<a className={homeStyles.brand}>
						<span
							className={`bi-instagram regular-icon brand-icon ${homeStyles.brandIcon}`}
						></span>
						<h5 className={homeStyles.brandName}>Erlgram</h5>
					</a>
				</Link>
				<ul className={homeStyles.navLinks}>
					<li className={homeStyles.navItem}>
						<a href="#" className={`navLink ps ${homeStyles.help}`}>
							Help
						</a>
					</li>
					<li className={homeStyles.navItem}>
						<button className="secondary-button pxm">Upgrade now</button>
					</li>
				</ul>
			</nav>

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
					<a href="./feed">
						<button className="primary-button pxm">Upgrade now</button>
					</a>
				</div>
			</main>
		</div>
	);
}
