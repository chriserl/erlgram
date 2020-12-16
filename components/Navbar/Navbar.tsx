import Link from "next/link";
import navbarStyles from "./navbar.module.scss";

export default function Navbar() {
	return (
		<nav className={navbarStyles.nav}>
			<Link href="/">
				<a className={navbarStyles.brand}>
					<span
						className={`bi-instagram large-icon brand-icon ${navbarStyles.brandIcon}`}
					></span>
					<h5 className={navbarStyles.brandName}>Erlgram</h5>
				</a>
			</Link>
			<form className={navbarStyles.navForm}>
				<div className="search-control">
					<input type="search" className="search-input" placeholder="Search" />
				</div>
			</form>
			<ul className={navbarStyles.navItems}>
				<li className={navbarStyles.navItem}>
					<button className="light-icon-button">
						<span className="bi-bell-fill small-icon"></span>
					</button>
				</li>
				<li className={navbarStyles.navItem}>
					<button className="primary-icon-button">
						<span className="bi-camera-fill small-icon"></span>
					</button>
				</li>
			</ul>
		</nav>
	);
}
