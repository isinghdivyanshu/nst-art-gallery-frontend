import EmblaCarousel from "@/components/carousel/Carousel";

export default function Create() {
	const SLIDE_COUNT = 11;
	const slides = Array.from(Array(SLIDE_COUNT).keys());
	return (
		<main>
			<EmblaCarousel slides={slides} />
		</main>
	);
}
