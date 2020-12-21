import Link from "next/link";

export default function Brand() {
	return (
		<Link href="/">
			<a className="brand">
				<span className="bi-hexagon large-icon brand-icon"></span>
				<h5 className="brand-name">Erlgram</h5>
			</a>
		</Link>
	);
}
