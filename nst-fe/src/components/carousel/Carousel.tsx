"use client";

import { useState, useEffect, useCallback } from "react";
import { DotButton, PrevButton, NextButton } from "./carouselButtons";
import useEmblaCarousel from "embla-carousel-react";
import { imageByIndex } from "./imageData";
import Image from "next/image";
import GdscFooter from "../GdscFooter";
import ViewSomething from "../ViewSomething";

interface EmblaCarouselProps {
	slides: number[];
}

const EmblaCarousel = ({ slides }: EmblaCarouselProps) => {
	const [viewportRef, embla] = useEmblaCarousel();
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
	const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
	const scrollTo = useCallback(
		(index: number) => embla && embla.scrollTo(index),
		[embla]
	);

	const onSelect = useCallback(() => {
		if (!embla) return;
		setSelectedIndex(embla.selectedScrollSnap());
		setPrevBtnEnabled(embla.canScrollPrev());
		setNextBtnEnabled(embla.canScrollNext());
	}, [embla]);

	useEffect(() => {
		if (!embla) return;
		onSelect();
		setScrollSnaps(embla.scrollSnapList());
		embla.on("select", onSelect);
	}, [embla, onSelect]);

	return (
		<>
			<div className="embla">
				<div className="embla__viewport" ref={viewportRef}>
					<div className="embla__container">
						{slides.map((index) => (
							<div className="embla__slide" key={index}>
								<div className="embla__slide__inner">
									<Image
										width={100}
										height={100}
										className="embla__slide__img"
										src={imageByIndex(index).src}
										alt={`Slide ${index}`}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="absolute bottom-0">
					<div className="button_container p-7 flex justify-center items-center select-none w-screen bg-[rgba(11,11,11,0.7)]">
						<PrevButton
							onClick={scrollPrev}
							enabled={prevBtnEnabled}
						/>
						<NextButton
							onClick={scrollNext}
							enabled={nextBtnEnabled}
						/>
					</div>
					<div className="carousel_footer bg-[rgba(11,11,11,0.7)] backdrop-blur flex justify-around">
						<ViewSomething
							text="Use your own style"
							className="justify-center text-light lg:text-xl w-1/3"
						/>
						<div className="embla__dots w-1/3">
							{scrollSnaps.map((_, index) => (
								<DotButton
									key={index}
									selected={index === selectedIndex}
									onClick={() => scrollTo(index)}
								/>
							))}
						</div>
						<GdscFooter className="cursor-pointer w-1/3 flex justify-center" />
					</div>
				</div>
			</div>
		</>
	);
};

export default EmblaCarousel;
