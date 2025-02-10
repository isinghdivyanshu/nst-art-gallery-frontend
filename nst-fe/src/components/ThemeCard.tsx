import Image, { StaticImageData } from "next/image";

interface ThemeCardProps {
	src: StaticImageData | string;
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
			<div className="relative w-[200px] h-[200px]">
				<Image
					src={src}
					fill
					alt={alt}
					className={`object-cover rounded-lg ${imageClassName}`}
				/>
			</div>
			<p className="text-center text-2xl mt-3 text-skin font-bold">
				{name}
			</p>
		</article>
	);
}
