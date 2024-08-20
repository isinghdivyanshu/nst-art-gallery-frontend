"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { DotButton, PrevButton, NextButton } from "./carouselButtons";
import useEmblaCarousel from "embla-carousel-react";
import { imageByIndex } from "./imageData";
import Image from "next/image";
import GdscFooter from "../GdscFooter";
import ViewSomething from "../ViewSomething";
import Button from "../Button";

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
							<div
								className="embla__slide overflow-hidden"
								key={index}
							>
								<div className="embla__slide__inner">
									<Image
										width={100}
										height={100}
										className="embla__slide__img cursor-grab active:cursor-grabbing z-10"
										src={imageByIndex(index).src}
										alt={imageByIndex(index).name}
									/>
								</div>
								<div className="gradient-overlay absolute inset-0 z-10"></div>
								<article className="image_overlay flex flex-col gap-3 absolute bottom-[calc(100svh-(100svh-12.25rem))] z-20 text-left pr-10 pl-8 lg:pr-96 lg:pl-48">
									<h1 className="text-light text-5xl lg:text-6xl tracking-wide">
										{imageByIndex(index).name.toUpperCase()}
									</h1>
									<h2 className="text-skin text-3xl lg:text-4xl tracking-wide">
										{imageByIndex(index).artist}
									</h2>
									<p className="text-light text-lg font-normal">
										{imageByIndex(index).desc}
									</p>
									<Link
										href={imageByIndex(index).link}
										target="_blank"
									>
										<ViewSomething
											text="Learn More"
											className="text-skin font-light w-fit"
										/>
									</Link>
									<section className="flex gap-10 mt-5">
										<Button
											text="Use this style"
											type="button"
											className="w-fit text-light bg-soil"
										/>
										<Button
											text="Create your own style"
											type="button"
											className="bg-transparent border border-soil backdrop-blur-lg text-light"
										/>
									</section>
								</article>
							</div>
						))}
					</div>
				</div>
				<div className="absolute bottom-0">
					<div className="button_container p-[1.5rem] flex justify-center items-center select-none w-screen">
						<PrevButton
							onClick={scrollPrev}
							enabled={prevBtnEnabled}
						/>
						<NextButton
							onClick={scrollNext}
							enabled={nextBtnEnabled}
						/>
					</div>
					<div className="carousel_footer bg-[rgba(11,11,11,0.3)] backdrop-blur flex justify-around">
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
