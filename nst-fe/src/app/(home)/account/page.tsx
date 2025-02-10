"use client";
import Image, { StaticImageData } from "next/image";
import placeholder from "../../../../pictures/placeholder.jpg";
import SignOutButton from "@/components/account/signOutButton";
import ViewSomething from "@/components/ViewSomething";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Art } from "@/models/art";
import { getAllUserArts } from "@/services/service";

export default function Account() {
	const [arts, setArts] = useState<Art[]>([]);
	const [loading, setLoading] = useState(true);
	const name = localStorage.getItem("name");
	useEffect(() => {
		const fetchArts = async () => {
			try {
				const id = localStorage.getItem("id");
				if (!id) {
					throw new Error("Unable to fetch user arts");
				}
				const data = await getAllUserArts(id);
				console.log(data);
				if (data?.response.arts) {
					const serializedArts = data?.response.arts;
					setArts(serializedArts);
				}


			} catch (error) {
				console.log("Failed to fetch arts:", error);
			} finally {
				setLoading(false);
			}
		};

		setLoading(true);
		let isMounted = true;
		if (isMounted) {
			fetchArts();
		}
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<main className="relative bg-dark py-20 px-48">
			<section className="relative bg-myGray py-10 px-5 flex flex-col items-center gap-2 mb-10">
				<Image
					src={placeholder}
					alt="Placeholder"
					width={200}
					height={200}
					className="rounded-full"
				/>
				<h1 className="text-3xl text-skin mt-5">{name} </h1>

				<SignOutButton />
			</section>
			<section>
				<h1 className="text-3xl text-light mb-5">Previous Art</h1>
				<section className="flex flex-wrap gap-4 items-start justify-center">
					{arts.map((art) => (
						<ArtCard
							key={art._id}
							src={art.image || placeholder}
							desc={art.description}
							likes={art.likes}
							artSlug={art.slug}
						/>
					))}
					{arts.length === 0 && (
						<p className="text-light text-center">No artworks yet</p>
					)}
				</section>
			</section>
			<Link href={"/create"}>
				<ViewSomething
					text="Create more art"
					className="text-light fixed bottom-10 right-5"
				/>
			</Link>
		</main>
	);
}

interface ArtCardProps {
	src: StaticImageData | string;
	desc: string;
	likes: number;
	artSlug: string;
}
function ArtCard({ src, desc, likes, artSlug }: ArtCardProps) {
	return (
		console.log(src),
		<article className="relative bg-mix p-2 flex flex-col w-52 overflow-hidden rounded-lg">
			<Image
				src={src}
				alt={desc.split(" ").pop() || ""}
				width={300}
				height={300}
			/>
			<p className="text-skin overflow-hidden whitespace-pre-line text-ellipsis mt-2 line-clamp-3 mb-2">
				{desc}
			</p>
			<aside className="text-light self-end">{likes}&nbsp;&nbsp;🤍</aside>
		</article>
	);
}
