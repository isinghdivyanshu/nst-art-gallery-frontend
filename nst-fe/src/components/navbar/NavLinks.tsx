"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
	const pathName = usePathname();

	const navLinks = [
		{
			title: "Create",
			path: "/create",
		},
		{
			title: "Gallery",
			path: "/gallery",
		},
		{
			title: "About Us",
			path: "/about-us",
		},
		{
			title: "Themes",
			path: "/themes",
		},
		{
			title: "My Account",
			path: "/account",
		},
	];

	return (
		<>
			{navLinks.map((navLink, index) => (
				<Link
					key={index}
					href={navLink.path}
					className="group transition-all duration-300 ease-in-out"
				>
					<span
						className={`relative after:bg-skin after:absolute after:h-1 after:w-0 after:-bottom-4 after:left-0 hover:after:w-full after:transition-all after:duration-500 after:rounded ${
							pathName == navLink.path
								? "text-skin after:w-full"
								: ""
						}`}
					>
						{navLink.title}
					</span>
				</Link>
			))}
		</>
	);
}
