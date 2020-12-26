import { useContext } from "react";
import Head from "next/head";
import { GlobalContext } from "../Contexts/GlobalContext";
import { useRedirect } from "../lib/hooks/next";
import { useReauthorizeUser } from "../lib/hooks/react";
import Home from "./home/index";

export default function Index() {
	const [GlobalState, dispatchGlobalState] = useContext(GlobalContext);

	useReauthorizeUser();

	GlobalState.authorized && useRedirect(GlobalState.account.userLink);

	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Home />
		</div>
	);
}
