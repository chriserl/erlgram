import homeStyles from "./home.module.scss";
import Link from "next/link";

export default function Home() {
	return (
		<div className={homeStyles.home}>
			<nav className={homeStyles.nav}>
				<Link href="/">
					<a className={homeStyles.brand}>
						<span
							className={`bi-instagram large-icon brand-icon ${homeStyles.brandIcon}`}
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
						<button className="secondary-button pxb">Upgrade now</button>
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
					<h1 className={homeStyles.mainText}>
						Pimp Your Design <br />
						on Instagram
					</h1>
					<p className={`ps ${homeStyles.auxText}`}>
						More functional and beautiful design. <br />
						Your life becomes more pleasant.
					</p>
					<button className="primary-button pxb">
						<a href="./feed.html">Upgrade now</a>
					</button>
				</div>
			</main>
		</div>
	);
}
