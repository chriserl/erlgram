import { useState, useContext } from "react";
import { useReauthorizeUser } from "../../lib/hooks/hooks";
import Navbar from "../../components/Navbar/Navbar";
import homeStyles from "./home.module.scss";

interface accountCardAction {
	type?: "SIGNIN" | "SIGNUP";
}

type cardTypes = "SIGNIN" | "SIGNUP";

export default function Home() {
	useReauthorizeUser();

	const [card, setCard] = useState<accountCardAction>({});

	const handleCardType = (cardtype: cardTypes) =>
		setCard(() => ({ type: cardtype }));

	return (
		<div className={homeStyles.homeContainer}>
			<Navbar cardControl={card} />
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
					<div className={homeStyles.ctas}>
						<button
							onClick={() => handleCardType("SIGNUP")}
							className={`primary-button psm ${homeStyles.signup}`}
						>
							Signup
						</button>

						<button
							onClick={() => handleCardType("SIGNIN")}
							className={`secondary-button psm ${homeStyles.signin}`}
						>
							Signin
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
