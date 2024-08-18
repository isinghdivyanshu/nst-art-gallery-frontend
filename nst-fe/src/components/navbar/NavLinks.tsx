"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/app/store";
import Button from "../Button";
import { UserRound } from "lucide-react";

export default function NavLinks() {
	const pathName = usePathname();
	const { isLoggedIn, name } = useStore();

	useEffect(() => {}, [isLoggedIn]);

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
			{isLoggedIn ? (
				<Link
					href={"/account"}
					className="group transition-all duration-300 ease-in-out"
				>
					<span
						className={`relative after:bg-skin after:absolute after:h-1 after:w-0 after:-bottom-4 after:left-0 hover:after:w-full after:transition-all after:duration-500 after:rounded ${
							pathName == "/account"
								? "text-skin after:w-full"
								: ""
						}`}
					>
						<span className="flex justify-between items-center gap-5 text-sm">
							<UserRound /> Hi, {name.split(" ")[0]}
						</span>
					</span>
				</Link>
			) : (
				<Link
					href={"/login"}
					className="group transition-all duration-300 ease-in-out"
				>
					<Button
						text="Sign In"
						type="button"
						className="text-darker"
					/>
				</Link>
			)}
		</>
	);
}
