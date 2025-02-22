"use client";
import Image, { StaticImageData } from "next/image";
import placeholder from "../../../../pictures/placeholder.jpg";
import { getAllArts, handleLike } from "@/services/service";
import { useState, useEffect, useCallback, useRef } from "react";
import { Art } from "@/models/art";
import { toast } from "sonner";
import Link from "next/link";
import { config } from "@/config/config";

const baseUrl = config.baseUrl || 'http://localhost:8000';


const NoGlobalArts = () => (
	<div className="relative min-h-[600px] w-full flex items-center justify-center">
		<div className="absolute inset-0 grid grid-cols-5 gap-4 p-4 overflow-hidden">
			{Array(15).fill(null).map((_, index) => (
				<div
					key={index}
					className={`transform transition-all
			  ${Math.floor(index / 5) === 0 ? 'opacity-30' : ''}
			  ${Math.floor(index / 5) === 1 ? 'opacity-20' : ''}
			  ${Math.floor(index / 5) === 2 ? 'opacity-10' : ''}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="267"
						height="264"
						viewBox="0 0 267 264"
						fill="none"
						className="opacity-10"
					>
						<g filter="url(#filter0_d_1555_3411)">
							<rect x="13" width="253.383" height="253.383" fill="#C4C4C4" />
						</g>
						<defs>
							<filter id="filter0_d_1555_3411" x="0.125653" y="0" width="266.257" height="263.228" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
								<feFlood floodOpacity="0" result="BackgroundImageFix" />
								<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
								<feOffset dx="-9.84509" dy="6.81583" />
								<feGaussianBlur stdDeviation="1.51463" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
								<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1555_3411" />
								<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1555_3411" result="shape" />
							</filter>
						</defs>
					</svg>
				</div>
			))}
		</div>

		<div className="relative z-10 flex flex-col items-center justify-center gap-6 py-20 rounded-2xl p-10">
			<div className="flex flex-col items-center gap-2">
				<h4 className="text-xl text-skin font-medium">No Global Arts</h4>
				<p className="text-light/60 text-center">Be the first to create and share your art with the world</p>
			</div>
			<Link href="/create">
				<button className="inline-flex px-6 py-3 justify-center items-center gap-2.5 rounded-lg bg-soil hover:bg-soil/80 transition-colors">
					<span className="text-light font-medium">Create Your First Art</span>
				</button>
			</Link>
		</div>
	</div>
);
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
				src={typeof src === 'string' ? baseUrl + src : src}
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
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const loadingMore = useRef(false);

	const fetchArts = async (pageNum: number) => {
		if (loadingMore.current) return;
		loadingMore.current = true;

		try {
			const data = await getAllArts(pageNum, 15);
			if (data?.response.arts) {
				const serializedArts = data.response.arts.map((art: { likedByUser: any; }) => ({
					...art,
					likedByUser: Boolean(art.likedByUser)
				}));

				if (pageNum === 1) {
					setArts(serializedArts);
				} else {
					setArts(prev => [...prev, ...serializedArts]);
				}

				setHasMore(serializedArts.length === 15);
			}
		} catch (error) {
			console.log("Failed to fetch arts:", error);
			toast.error("Failed to fetch arts");
		} finally {
			setLoading(false);
			loadingMore.current = false;
		}
	};

	useEffect(() => {
		fetchArts(1);
	}, []);

	const handleScroll = useCallback(() => {
		if (loadingMore.current || !hasMore) return;

		const scrollPosition = window.innerHeight + window.scrollY;
		const documentHeight = document.documentElement.offsetHeight;

		if (scrollPosition >= documentHeight * 0.8) {
			setPage(prev => prev + 1);
			fetchArts(page + 1);
		}
	}, [hasMore, page]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

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
								likedByUser: !art.likedByUser
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
			width: "15vw",
			height: "50vh",
			marginTop: (i: number) => `-${Math.floor(i / 5) * 15}vh`,
		},
		{
			width: "18vw",
			height: "55vh",
			marginTop: (i: number) => `-${Math.floor(i / 5) * 10}vh`,
		},
		{
			width: "20vw",
			height: "65vh",
			marginTop: "0vh"
		},
		{
			width: "18vw",
			height: "53vh",
			marginTop: (i: number) => `-${Math.floor(i / 5) * 12}vh`,
		},
		{
			width: "15vw",
			height: "50vh",
			marginTop: (i: number) => `-${Math.floor(i / 5) * 15}vh`,
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
			{loading && page === 1 ? (
				<section className="flex gap-2 justify-centers flex-wrap">
					{Array(10).fill(null).map((_, i) => {
						const { width, height, marginTop } = sizes[i % 5];
						return (
							<article
								key={i}
								className="relative bg-mix/20 flex flex-col overflow-hidden rounded-lg p-2 animate-pulse"
								style={{
									width,
									height,
									top: typeof marginTop === "function" ? marginTop(i) : marginTop,
								}}
							>
								<div className="relative w-full h-4/5 rounded-lg bg-mix/30 overflow-hidden">
									<div className="absolute inset-0 bg-gradient-to-r from-transparent via-soil/10 to-transparent animate-shimmer" />
								</div>
								<div className="flex flex-col gap-2 mt-3">
									<div className="h-4 bg-mix/30 rounded w-3/4" />
									<div className="h-4 bg-mix/30 rounded w-1/2" />
									<div className="flex justify-between items-center mt-2">
										<div className="h-4 bg-mix/30 rounded w-1/4" />
										<div className="h-6 w-6 bg-mix/30 rounded-full" />
									</div>
								</div>
							</article>
						);
					})}
				</section>
			) : arts.length > 0 ? (
				<>
					<section className="flex gap-2 justify-centers flex-wrap">
						{images}
					</section>

					{/* Loading more indicator */}
					{loadingMore.current && (
						<div className="w-full h-48 relative overflow-hidden bg-mix/20 rounded-lg mt-8">
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-soil/10 to-transparent animate-shimmer" />
						</div>
					)}

					{/* No more arts message */}
					{!hasMore && arts.length > 0 && (
						<div className="text-center text-light/60 mt-8 pb-4">
							No more arts to load
						</div>
					)}
				</>
			) : (
				<NoGlobalArts />
			)}
		</main>
	);
}