"use client";
import Image, { StaticImageData } from "next/image";
import placeholder from "../../../../pictures/placeholder.jpg";
import SignOutButton from "@/components/account/signOutButton";
import ViewSomething from "@/components/ViewSomething";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Art } from "@/models/art";
import { getAllUserArts } from "@/services/service";
import { config } from "@/config/config";

const baseUrl = config.baseUrl || 'http://localhost:8000';
const BoxSvg = () => (
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
);

const NoArtState = () => (
	<div className="relative min-h-[600px] w-full flex items-center justify-center">
		<div className="absolute inset-0 grid grid-cols-4 gap-4 p-4 overflow-hidden">
			{Array(12).fill(null).map((_, index) => (
				<div
					key={index}
					className={`transform transition-all
            ${Math.floor(index / 4) === 0 ? 'opacity-30' : ''}
            ${Math.floor(index / 4) === 1 ? 'opacity-20' : ''}
            ${Math.floor(index / 4) === 2 ? 'opacity-10' : ''}`}
				>
					<BoxSvg />
				</div>
			))}
		</div>

		{/* Content overlay */}
		<div className="relative z-10 flex flex-col items-center justify-center gap-6 py-20 rounded-2xl p-10">
			<div className="flex flex-col items-center gap-2">
				<h3 className="text-xl text-skin font-medium">No Art Currently</h3>
				<p className="text-light/60 text-center">Every image that you create and save appears here</p>
			</div>
			<Link href="/create">
				<button className="inline-flex px-6 py-3 justify-center items-center gap-2.5 rounded-lg bg-soil hover:bg-soil/80 transition-colors">
					<span className="text-light font-medium">Create Your First Art</span>
				</button>
			</Link>
		</div>
	</div>
);

export default function Account() {
	const [arts, setArts] = useState<Art[]>([]);
	const [loading, setLoading] = useState(true);
	const [name,setName] = useState("User");
	useEffect(() => {
		const fetchArts = async () => {
			setLoading(true);
			const name=localStorage.getItem("name");
			try {
				const id = localStorage.getItem("id");
				if (!id) {
					throw new Error("Unable to fetch user arts");
				}
				const data = await getAllUserArts(id);
				if (data?.response.arts) {
					const serializedArts = data?.response.arts;
					setArts(serializedArts);
					setName(name ? name : "User");
				}


			} catch (error) {
				console.log("Failed to fetch arts:", error);
			} finally {
				setLoading(false);
			}
		};

		let isMounted = true;
		if (isMounted) {
			fetchArts();
		}
		return () => {
			isMounted = false;
		};
	}, []);

	if (loading) {
		return (
			<main className="relative bg-dark py-20 px-48">
				{/* Profile Section Skeleton */}
				<section className="relative bg-myGray py-10 px-5 flex flex-col items-center gap-2 mb-10">
					<div className="relative w-[200px] h-[200px] rounded-full bg-mix/20 overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-r from-transparent via-soil/10 to-transparent animate-shimmer" />
					</div>
					<div className="h-8 w-48 bg-mix/20 rounded-lg mt-5 animate-pulse" />
					<div className="h-10 w-32 bg-mix/20 rounded-lg mt-2 animate-pulse" />
				</section>

				{/* Arts Section Skeleton */}
				<div className="h-8 w-48 bg-mix/20 rounded-lg mb-5 animate-pulse" />
				<section className="flex flex-wrap gap-4 items-start justify-center">
					{Array(6).fill(null).map((_, index) => (
						<article key={index} className="relative bg-mix p-2 flex flex-col w-52 overflow-hidden rounded-lg">
							<div className="relative w-full h-[200px] bg-mix/20 rounded-lg overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-soil/10 to-transparent animate-shimmer" />
							</div>
							<div className="space-y-2 mt-2">
								<div className="h-4 w-full bg-mix/20 rounded animate-pulse" />
								<div className="h-4 w-3/4 bg-mix/20 rounded animate-pulse" />
								<div className="h-4 w-1/2 bg-mix/20 rounded animate-pulse" />
							</div>
							<div className="h-6 w-12 bg-mix/20 rounded mt-2 self-end animate-pulse" />
						</article>
					))}
				</section>
			</main>
		);
	}
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
					{arts.length > 0 ? (
						arts.map((art) => (
							<ArtCard
								key={art._id}
								src={art.image || placeholder}
								desc={art.description}
								likes={art.likes}
								artSlug={art.slug}
							/>
						))
					) : (
						<NoArtState />
					)}
				</section>
			</section>
			{arts.length > 0 ?
				<Link href={"/create"}>
					<ViewSomething
						text="Create more art"
						className="text-light fixed bottom-10 right-5"
					/>
				</Link>
				: null}
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
		<article className="relative bg-mix p-2 flex flex-col w-[280px] overflow-hidden rounded-lg">
			<div className="relative w-full aspect-square overflow-hidden rounded-lg">
				<Image
					src={baseUrl + src}
					alt={desc.split(" ").pop() || ""}
					fill
					className="object-cover"
					sizes="(max-width: 280px) 100vw, 280px"
				/>
			</div>
			<p className="text-skin overflow-hidden whitespace-pre-line text-ellipsis mt-3 line-clamp-3 mb-2">
				{desc}
			</p>
			<aside className="text-light self-end">{likes}&nbsp;&nbsp;🤍</aside>
		</article>
	);
}
