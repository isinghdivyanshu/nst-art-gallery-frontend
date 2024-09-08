import NavLinks from "./NavLinks";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="nav w-full py-5 px-10 flex justify-between bg-dark text-xl text-light h-[4.25rem]">
			<header className="grow">
				<Link href={"/explore"}>Logo</Link>
			</header>
			<section className="flex grow justify-around items-center">
				<NavLinks />
			</section>
		</nav>
	);
}
