import { useRouter } from "next/router";

function useRedirect(redirectRoute: string) {
	const router = useRouter();

	router.push(redirectRoute);
}

export { useRedirect };
