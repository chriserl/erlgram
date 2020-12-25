import Link from "next/link";

export default function Brand() {
	return (
		<Link href="/">
			<a className="brand">
				<span className="bi-hexagon large-icon brand-icon"></span>
				<h4 className="brand-name">erlgram</h4>
			</a>
		</Link>
	);
}
