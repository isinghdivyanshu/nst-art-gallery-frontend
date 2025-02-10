"use client";
import Image, { StaticImageData } from "next/image";
import placeholder from "../../../../pictures/placeholder.jpg";
import { getAllArts, handleLike } from "@/services/service";
import { useState, useEffect } from "react";
import { Art } from "@/models/art";
import { toast } from "sonner";

interface ArtCardProps {
	style: any;
	src: StaticImageData | string;
	desc: string;
	author: string;
	likes: number;
	artSlug: string;
	onLike: (artId: string) => void;
	likedByUser: boolean;
}

const ArtCard = ({
	style,
	src,
	desc,
	author,
	likes,
	artSlug,
	onLike,
	likedByUser,
}: ArtCardProps) => {
	return (
		<article
			className="relative bg-mix flex flex-col overflow-auto rounded-lg p-2"
			style={style}
		>
			<Image
				src={src}
				alt={`Art by ${author}`}
				width={50}
				height={50}
				className="w-full rounded-lg h-4/5"
			/>
			<p className="text-skin line-clamp-2 text-ellipsis whitespace-pre-line overflow-hidden mt-3 mb-1">
				{desc}
			</p>
			<span className="text-light italic">{author}</span>
			<aside className="text-light self-end flex items-center">
				{likes}&nbsp;&nbsp;
				<button
					onClick={() => onLike(artSlug)}
					className="text-light self-end flex items-center gap-1 transition-all hover:scale-110"
				>
					<svg
						className={`w-6 h-6 ${likedByUser ? 'text-red-500 fill-current' : 'text-gray-400'}`}
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</button>
			</aside>
		</article>
	);
};

export default function Gallery() {
	const [arts, setArts] = useState<Art[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchArts = async () => {
			try {
				const data = await getAllArts();
				if (data?.response.arts) {
					const serializedArts = data.response.arts.map((art: { likedByUser: any; }) => ({
						...art,
						likedByUser: Boolean(art.likedByUser) // Ensure boolean value
					}));
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

	// Update the handleLikeClick function to properly toggle the state
	const handleLikeClick = async (artSlug: string) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				toast.error("You need to be logged in to like an art.");
				return;
			}

			const response = await handleLike({ artSlug }, token);
			if (response) {
				setArts((prevArts) =>
					prevArts.map((art) =>
						art.slug === artSlug
							? {
								...art,
								likes: art.likes + (response.likes ? 1 : -1),
								likedByUser: !art.likedByUser // Toggle the liked state
							}
							: art
					)
				);
			}
		} catch (error) {
			toast.error("Failed to like art");
			console.error("Failed to like art:", error);
		}
	};
	const x = 10,
		y = 20;
	const images = [];
	const sizes = [
		{
			width: "18vw",
			height: "50vh",
			marginTop: (i: number) => `-${Math.floor(i / 5) * y}vh`,
		},
		{
			width: "13vw",
			height: "60vh",
			marginTop: (i: number) => `-${Math.floor(i / 5) * x}vh`,
		},
		{ width: "25vw", height: "70vh", marginTop: "0vh" },
		{
			width: "13vw",
			height: "60vh",
			marginTop: (i: number) => `-${Math.floor(i / 5) * x}vh`,
		},
		{
			width: "18vw",
			height: "50vh",
			marginTop: (i: number) => `-${Math.floor(i / 5) * y}vh`,
		},
	];

	for (let i = 0; i < arts.length; i++) {
		const { width, height, marginTop } = sizes[i % 5];
		images.push(
			<ArtCard
				key={arts[i]?._id}
				style={{
					width,
					height,
					top:
						typeof marginTop === "function"
							? marginTop(i)
							: marginTop,
				}}
				src={arts[i]?.image || placeholder}
				author={arts[i]?.artist.name}
				likes={arts[i]?.likes}
				desc={arts[i]?.description}
				artSlug={arts[i]?.slug}
				onLike={handleLikeClick}
				likedByUser={arts[i]?.likedByUser}
			/>
		);
	}

	return (
		<main className="py-20 px-[5vw] bg-dark">
			<section className="flex flex-col w-full justify-center items-center gap-2">
				<h1 className="text-5xl text-skin tracking-widest">GALLERY</h1>
				<article className="flex divide-x justify-between max-w-fit text-soil mb-20">
					<h2 className="pr-3 border-soil tracking-wider font-semibold">
						Discover
					</h2>
					<h2 className="px-3 border-soil tracking-wider font-semibold">
						Create
					</h2>
					<h2 className="pl-3 border-soil tracking-wider font-semibold">
						Inspire
					</h2>
				</article>
			</section>
			<section className="flex gap-2 justify-centers flex-wrap">
				{images}
			</section>
			{loading && <p>Loading...</p>}
		</main>
	);
}