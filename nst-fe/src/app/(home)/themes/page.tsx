"use client";
import Image, { StaticImageData } from "next/image";
import placeholder from "@/../pictures/placeholder.jpg";
import ThemeCard from "@/components/ThemeCard";
import { useState, useEffect } from "react";
import { getAllThemes, getThemeOfTheDay } from "@/services/service";
import type { Theme } from "@/models/theme";
import { toast } from "sonner";

export default function Theme() {
	const [theme, setTheme] = useState<Theme | null>(null);
	const [loading, setLoading] = useState(true);
	const BASE_URL = 'http://localhost:8000';
	const [themes, setThemes] = useState<Theme[]>([]);

	useEffect(() => {
		setLoading(true);
		const fetchThemeOfDay = async () => {
			try {
				const data = await getThemeOfTheDay();
				if (data?.response.theme) {
					// Ensure the theme is a plain object
					const plainTheme = JSON.parse(JSON.stringify(data.response.theme));
					setTheme(plainTheme);
				}
			} catch (error) {
				toast.error("Failed to fetch theme of the day");
				console.error("Failed to fetch theme of the day:", error);
			} finally {
				setLoading(false);
			}
		};

		const allThemes = async () => {
			setLoading(true);
			try {
				const data = await getAllThemes();
				if (data?.response.themes) {
					const plainThemes = JSON.parse(JSON.stringify(data.response.themes));
					const shuffledThemes = [...plainThemes].sort(() => Math.random() - 0.5);
					setThemes(shuffledThemes);
				}
			} catch (error) {
				toast.error("Failed to fetch themes");
				console.error("Failed to fetch themes:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchThemeOfDay();
		allThemes();
	}, []);

	if (loading) {
		return (
			<main className="bg-dark text-light p-20">
				<div className="relative bg-[url('../assets/theme/bg.png')]">
					<div className="h-full w-full bg-transparent p-20 backdrop-blur">
						<div className="flex flex-col items-center bg-dark py-10 px-32 xl:px-48">
							{/* Title Skeleton */}
							<div className="h-12 w-96 bg-mix/20 rounded-lg mb-10 animate-pulse" />
							<hr className="w-[8%]" />
							{/* Theme Title Skeleton */}
							<div className="h-8 w-64 bg-mix/20 rounded-lg my-5 animate-pulse" />
							<hr className="w-[8%]" />

							{/* Theme Images Skeleton */}
							<section className="flex gap-2 mt-10 w-full overflow-auto">
								{Array(4).fill(null).map((_, index) => (
									<div key={index} className="relative w-[300px] h-[200px] bg-mix/20 rounded-lg overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-soil/10 to-transparent animate-shimmer" />
									</div>
								))}
							</section>

							{/* Description Skeleton */}
							<div className="w-full p-10 mt-10">
								{Array(4).fill(null).map((_, index) => (
									<div key={index} className="h-6 bg-mix/20 rounded-lg mb-3 animate-pulse" />
								))}
							</div>

							{/* Work Title Skeleton */}
							<div className="h-10 w-80 bg-mix/20 rounded-lg mt-32 mb-5 animate-pulse" />

							{/* Work Images Skeleton */}
							<section className="flex gap-5 w-full">
								{Array(2).fill(null).map((_, index) => (
									<div key={index} className="relative grow h-[400px] bg-mix/20 rounded-lg overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-soil/10 to-transparent animate-shimmer" />
									</div>
								))}
							</section>

							{/* Art Sections Skeleton */}
							{Array(3).fill(null).map((_, index) => (
								<section key={index} className="w-full rounded-3xl bg-myGray p-10 flex gap-10 items-center my-5">
									<div className="relative w-[600px] h-[400px] bg-mix/20 rounded-lg overflow-hidden">
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-soil/10 to-transparent animate-shimmer" />
									</div>
									<article className="h-full flex flex-col justify-center gap-4 flex-1">
										<div className="h-6 w-48 bg-mix/20 rounded-lg animate-pulse" />
										<div className="h-6 w-32 bg-mix/20 rounded-lg animate-pulse" />
										<div className="h-6 w-64 bg-mix/20 rounded-lg animate-pulse" />
									</article>
								</section>
							))}

							{/* Other Themes Section */}
							<div className="h-10 w-64 bg-mix/20 rounded-lg mt-20 mb-10 animate-pulse" />
							<section className="flex flex-wrap gap-5 justify-center">
								{Array(6).fill(null).map((_, index) => (
									<div key={index} className="flex flex-col gap-3">
										<div className="relative w-[200px] h-[200px] bg-mix/20 rounded-lg overflow-hidden">
											<div className="absolute inset-0 bg-gradient-to-r from-transparent via-soil/10 to-transparent animate-shimmer" />
										</div>
										<div className="h-6 w-32 bg-mix/20 rounded-lg mx-auto animate-pulse" />
									</div>
								))}
							</section>
						</div>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="bg-dark text-light p-20">
			<div className="relative bg-[url('../assets/theme/bg.png')]">
				<div className="h-full w-full bg-transparent p-20 backdrop-blur">
					<div className="flex flex-col items-center bg-dark py-10 px-32 xl:px-48">
						<h1 className="text-5xl text-skin mb-10">
							Theme of the Day
						</h1>
						<hr className="w-[8%]" />
						<h2 className="text-2xl my-5 tracking-widest">
							{theme ? theme.theme_title : "SURREALISM"}
						</h2>
						<hr className="w-[8%]" />
						<section className="flex gap-2 mt-10 w-full overflow-auto">
							{theme
								? theme.theme_images.map((src, index) => (
									<Image
										key={index}
										src={`${BASE_URL}${src}`}
										width={300}
										height={200}
										alt={`Theme image ${index + 1}`}
										className="object-cover"
									/>
								))
								: Array(4)
									.fill(placeholder)
									.map((src, index) => (
										<Image
											key={index}
											src={src}
											width={300}
											height={200}
											alt="placeholder image"
											className="object-cover"
										/>
									))}
						</section>
						<p className="w-full p-10 mt-10 text-xl">
							{theme
								? theme.theme_description
								: "Surrealism is an art and cultural movement that developed in Europe in the aftermath of World War I in which artists aimed to allow the unconscious mind to express itself, often resulting in the depiction of illogical or dreamlike scenes and ideas. Its intention was, according to leader André Breton, to \"resolve the previously contradictory conditions of dream and reality into an absolute reality, a super-reality\", or surreality."}
						</p>
						<p className="w-full px-10 mt-5">
							Learn more:
							<a
								href="theme?.info_link"
								target="_blank"
								className="text-blue-500"
							>
								{theme?.info_link ?? "https://www.wikipedia.com/{theme.name}"}
							</a>
						</p>
						<h2 className="mt-32 text-4xl mb-5">
							{theme ? theme.work_title : "The Persistence of Memory"}
						</h2>
						<section className="flex gap-5 w-full">
							{theme
								? theme.work_images.map((src, index) => (
									<Image
										key={index}
										src={src.startsWith('http') ? src : `${BASE_URL}${src}`}
										width={600}
										height={400}
										alt={`Work image ${index + 1}`}
										className={`grow object-cover`}
									/>
								))
								: Array(2)
									.fill(placeholder)
									.map((src, index) => (
										<Image
											key={index}
											src={src}
											width={600}
											height={400}
											alt="placeholder image"
											className={`${index === 0 ? "grow" : ""} object-cover`}
										/>
									))}
						</section>
						<p className="w-full p-10 text-xl">
							{theme
								? theme.work_description
								: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo eaque, aperiam quos asperiores nihil dolor numquam esse voluptatum beatae ut reiciendis porro pariatur quibusdam maiores obcaecati est rem veniam animi. Nulla et cum provident quaerat iure ducimus incidunt eum quo optio blanditiis dignissimos voluptatum nisi, aspernatur qui culpa laborum cupiditate beatae numquam consectetur quidem distinctio nostrum vel. Suscipit, ipsa nam. Nihil nam et odio est mollitia, pariatur placeat sint error voluptatum neque earum maxime nulla eaque autem consequuntur! Libero ut voluptatibus excepturi dicta, cum id ipsam repudiandae? Placeat, nostrum quod! Placeat quos dolorum delectus repellendus quas. Saepe repudiandae, inventore dolore, cupiditate numquam illum laborum temporibus culpa, ad obcaecati nihil voluptatum exercitationem quis eos soluta debitis at voluptates consequatur incidunt sed. Perferendis dolorum possimus quod iusto inventore earum quae repellat veritatis rem aliquid quibusdam, consequatur quos fugiat voluptatem odit nulla officia totam qui libero quas mollitia voluptates. Fugit enim dolorum repellat!"}
						</p>
						<h2 className="mt-32 text-4xl mb-5">
							SOME OTHER WORKS OF {theme ? theme.theme_title.toUpperCase() : "SURREALISM"}
						</h2>
						{theme
							? theme.history.map((item, index) => (
								<ArtSection
									key={index}
									src={item.src}
									alt={`Art by ${item.artist.name}`}
									artist={item.artist.name}
									artistDetail={item.artist.period}
									desc={item.art.title}
									year={item.art.year}
									containerClassName={index % 2 === 1 ? "xl:flex-row-reverse my-5" : ""}
								/>
							))
							: Array(3)
								.fill({
									src: placeholder,
									artist: "FRIDA KAHLO",
									artistDetail: "Dutch, 1853 - 1890",
									desc: "Self-Portrait with Thorn Necklace and Hummingbird, ",
									year: "1889",
								})
								.map((item, index) => (
									<ArtSection
										key={index}
										src={item.src}
										alt="Placeholder"
										artist={item.artist}
										artistDetail={item.artistDetail}
										desc={item.desc}
										year={item.year}
										containerClassName={index % 2 === 1 ? "xl:flex-row-reverse my-5" : ""}
									/>
								))}
						<h2 className="mt-20 mb-10 text-4xl text-skin">
							OTHER THEMES
						</h2>
						<section className="flex flex-wrap gap-5 justify-center">
							{themes.length > 0 ? (
								themes.slice(0, 6).map((theme, index) => (
									<ThemeCard
										key={theme._id}
										src={`${BASE_URL}${theme.theme_images[0]}`}
										alt={theme.theme_title}
										name={theme.theme_title}
									/>
								))
							) : (
								Array(6)
									.fill(placeholder)
									.map((src, index) => (
										<ThemeCard
											key={index}
											src={src}
											alt="Placeholder"
											name="Loading..."
										/>
									))
							)}
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}

interface ArtSectionProps {
	src: StaticImageData | string;
	alt: string;
	artist: string;
	artistDetail: string;
	desc: string;
	year: string;
	containerClassName?: string;
	imageClassName?: string;
}

function ArtSection({
	src,
	alt,
	artist,
	artistDetail,
	desc,
	year,
	containerClassName,
	imageClassName,
}: ArtSectionProps) {
	return (
		<section
			className={`w-full rounded-3xl bg-myGray p-10 flex gap-10 items-center flex-col xl:flex-row ${containerClassName}`}
		>
			<Image
				src={src}
				width={600}
				height={1000}
				alt={alt}
				className={`${imageClassName}`}
			/>
			<article className="h-full flex flex-col justify-center  text-xl">
				<p>{artist}</p>
				<p>{artistDetail}</p>
				<br />
				<p>
					{desc}
					<span>{year}</span>
				</p>
				<hr className="w-full my-5" />
			</article>
		</section>
	);
}
