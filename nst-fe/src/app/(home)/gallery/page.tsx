import Image, { StaticImageData } from "next/image";
import placeholder from "../../../../pictures/palceholder.jpg";

export default function Gallery() {
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

	for (let i = 0; i < 100; i++) {
		const { width, height, marginTop } = sizes[i % 5];
		images.push(
			<ArtCard
				style={{
					width,
					height,
					top:
						typeof marginTop === "function"
							? marginTop(i)
							: marginTop,
				}}
				src={placeholder}
				author="Divyanshu Singh"
				likes={27}
				desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
				et aperiam fugit cum laudantium! Dignissimos quaerat natus
				repellendus facilis quibusdam nihil soluta temporibus quas in
				saepe, earum nobis ut rerum? Velit similique ea enim tenetur
				quam quidem odio a aut consequatur iusto. Sapiente esse ab iure
				perspiciatis fugiat obcaecati, ut quae soluta explicabo?
				Explicabo culpa commodi quae illum blanditiis suscipit? Impedit
				veniam quae nihil quia placeat distinctio quos quas quibusdam
				numquam, libero, illum vero, sunt atque tenetur! Dolorem labore
				tenetur debitis sed! Nemo est cum ut harum at, tempora aperiam.
				Repellat, exercitationem dolor harum saepe incidunt repudiandae
				totam molestiae doloribus impedit dolores nesciunt, quo
				asperiores atque vel error culpa! Officiis, architecto. Eum,
				quos qui atque voluptas eaque iste labore delectus. Pariatur
				quia dolor recusandae sequi nesciunt aspernatur facilis est rem
				perferendis error, ut earum culpa quas nulla assumenda officia
				velit autem! Accusamus facere ea dolor blanditiis ipsam quidem
				esse magnam.."
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
		</main>
	);

	interface ArtCardProps {
		style: any;
		src: StaticImageData;
		desc: string;
		author: string;
		likes: number;
		liked?: boolean;
	}

	function ArtCard({ style, src, desc, author, likes }: ArtCardProps) {
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
				<aside className="text-light self-end">
					{likes}&nbsp;&nbsp;🤍
				</aside>
			</article>
		);
	}
}
