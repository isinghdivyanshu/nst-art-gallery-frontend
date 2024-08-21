import NavLinks from "./NavLinks";

export default function Navbar() {
	return (
		<nav className="w-full py-5 px-10 flex justify-between bg-dark text-xl text-light h-[4.25rem]">
			<header className="grow">Logo</header>
			<section className="flex grow justify-around items-center">
				<NavLinks />
			</section>
		</nav>
	);
}
