import Image, { StaticImageData } from "next/image";

interface ThemeCardProps {
	src: StaticImageData;
	alt: string;
	name: string;
	containerClassName?: string;
	imageClassName?: string;
}

export default function ThemeCard({
	src,
	alt,
	name,
	containerClassName,
	imageClassName,
}: ThemeCardProps) {
	return (
		<article className={`group flex flex-col ${containerClassName}`}>
			<Image
				src={src}
				width={200}
				height={200}
				alt={alt}
				className={`${imageClassName}`}
			/>
			<p className="text-center text-2xl mt-3 text-skin font-bold">
				{name}
			</p>
		</article>
	);
}
