import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GlobalContext } from "../Contexts/GlobalContext";
import { useReauthorizeUser } from "../lib/hooks/react";
import Home from "./home/index";

export default function Index() {
	const router = useRouter();

	const [GlobalState, dispatchGlobalState] = useContext(GlobalContext);

	useReauthorizeUser();

	useEffect(() => {
		if (router) {
			GlobalState.authorized && router.push(GlobalState.account.userLink);
		}
	}, [GlobalState]);

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
