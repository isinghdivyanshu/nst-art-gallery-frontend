import Image, { StaticImageData } from "next/image";
import placeholder from "@/../pictures/palceholder.jpg";

export default function Theme() {
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
							SURREALISM
						</h2>
						<hr className="w-[8%]" />
						<section className="flex gap-2 mt-10 w-full overflow-auto">
							<Image
								src={placeholder}
								objectFit="cover"
								alt="placeholder image"
							/>
							<Image
								src={placeholder}
								objectFit="cover"
								alt="placeholder image"
							/>
							<Image
								src={placeholder}
								objectFit="cover"
								alt="placeholder image"
							/>
							<Image
								src={placeholder}
								objectFit="cover"
								alt="placeholder image"
							/>
						</section>
						<p className="w-full p-10 mt-10 text-xl">
							Surrealism is an art and cultural movement that
							developed in Europe in the aftermath of World War I
							in which artists aimed to allow the unconscious mind
							to express itself, often resulting in the depiction
							of illogical or dreamlike scenes and ideas. Its
							intention was, according to leader André Breton, to
							&quot;resolve the previously contradictory
							conditions of dream and reality into an absolute
							reality, a super-reality&quot;, or surreality.
						</p>
						<p className="w-full px-10 mt-5">
							Learn more:{" "}
							<a
								href="https://www.wikipedia.com"
								target="_blank"
								className="text-blue-500"
							>
								https://www.wikipedia.com
							</a>
						</p>
						<h2 className="mt-32 text-4xl mb-5">
							The Persistence of Memory
						</h2>
						<section className="flex gap-5 w-full">
							<Image
								src={placeholder}
								objectFit="cover"
								alt="placeholder image"
								className="grow"
							/>
							<Image
								src={placeholder}
								objectFit="cover"
								alt="placeholder image"
								className=""
							/>
						</section>
						<p className="w-full p-10 text-xl">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quo eaque, aperiam quos asperiores nihil dolor
							numquam esse voluptatum beatae ut reiciendis porro
							pariatur quibusdam maiores obcaecati est rem veniam
							animi. Nulla et cum provident quaerat iure ducimus
							incidunt eum quo optio blanditiis dignissimos
							voluptatum nisi, aspernatur qui culpa laborum
							cupiditate beatae numquam consectetur quidem
							distinctio nostrum vel. Suscipit, ipsa nam. Nihil
							nam et odio est mollitia, pariatur placeat sint
							error voluptatum neque earum maxime nulla eaque
							autem consequuntur! Libero ut voluptatibus excepturi
							dicta, cum id ipsam repudiandae? Placeat, nostrum
							quod! Placeat quos dolorum delectus repellendus
							quas. Saepe repudiandae, inventore dolore,
							cupiditate numquam illum laborum temporibus culpa,
							ad obcaecati nihil voluptatum exercitationem quis
							eos soluta debitis at voluptates consequatur
							incidunt sed. Perferendis dolorum possimus quod
							iusto inventore earum quae repellat veritatis rem
							aliquid quibusdam, consequatur quos fugiat
							voluptatem odit nulla officia totam qui libero quas
							mollitia voluptates. Fugit enim dolorum repellat!
						</p>
						<h2 className="mt-32 text-4xl mb-5">
							SOME OTHER WORKS OF SURREALISM
						</h2>
						<ArtSection
							src={placeholder}
							alt="Placeholder"
							artist="FRIDA KAHLO"
							artistDetail="Dutch, 1853 - 1890"
							desc="Self-Portrait with Thorn Necklace and
									Hummingbird, "
							year="1889"
						/>
						<ArtSection
							src={placeholder}
							alt="Placeholder"
							artist="FRIDA KAHLO"
							artistDetail="Dutch, 1853 - 1890"
							desc="Self-Portrait with Thorn Necklace and
									Hummingbird, "
							year="1889"
							containerClassname="xl:flex-row-reverse my-5"
						/>
						<ArtSection
							src={placeholder}
							alt="Placeholder"
							artist="FRIDA KAHLO"
							artistDetail="Dutch, 1853 - 1890"
							desc="Self-Portrait with Thorn Necklace and
									Hummingbird, "
							year="1889"
						/>
						<h2 className="mt-20 mb-10 text-4xl text-skin">
							OTHER THEMES
						</h2>
						<section className="flex flex-wrap gap-5 justify-center">
							<ThemeCard
								src={placeholder}
								alt="Placeholder"
								name="Abstract"
							/>
							<ThemeCard
								src={placeholder}
								alt="Placeholder"
								name="Abstract"
							/>
							<ThemeCard
								src={placeholder}
								alt="Placeholder"
								name="Abstract"
							/>
							<ThemeCard
								src={placeholder}
								alt="Placeholder"
								name="Abstract"
							/>
							<ThemeCard
								src={placeholder}
								alt="Placeholder"
								name="Abstract"
							/>
							<ThemeCard
								src={placeholder}
								alt="Placeholder"
								name="Abstract"
							/>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}

interface ArtSectionProps {
	src: StaticImageData;
	alt: string;
	artist: string;
	artistDetail: string;
	desc: string;
	year: string;
	containerClassname?: string;
	imageClassname?: string;
}

function ArtSection({
	src,
	alt,
	artist,
	artistDetail,
	desc,
	year,
	containerClassname,
	imageClassname,
}: ArtSectionProps) {
	return (
		<section
			className={`w-full rounded-3xl bg-bg p-10 flex gap-10 items-center flex-col xl:flex-row ${containerClassname}`}
		>
			<Image
				src={src}
				width={600}
				height={1000}
				alt={alt}
				className={`${imageClassname}`}
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

interface ThemeCardProps {
	src: StaticImageData;
	alt: string;
	name: string;
	containerClassname?: string;
	imageClassname?: string;
}

function ThemeCard({
	src,
	alt,
	name,
	containerClassname,
	imageClassname,
}: ThemeCardProps) {
	return (
		<article className={`flex flex-col ${containerClassname}`}>
			<Image
				src={src}
				width={200}
				height={200}
				alt={alt}
				className={`${imageClassname}`}
			/>
			<p className="text-center text-2xl mt-3 text-skin font-bold">
				{name}
			</p>
		</article>
	);
}
