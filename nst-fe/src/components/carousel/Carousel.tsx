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
import { Info } from "lucide-react";

interface EmblaCarouselProps {
	slides: number[];
}

const EmblaCarousel = ({ slides }: EmblaCarouselProps) => {
	const [viewportRef, embla] = useEmblaCarousel({ loop: true });
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
										className="embla__slide__img  z-10"
										src={imageByIndex(index).src}
										alt={imageByIndex(index).name}
									/>
								</div>
								<div className="gradient-overlay absolute inset-0 cursor-grab active:cursor-grabbing z-10"></div>
								<section className="flex flex-col lg:flex-row gap-10 absolute bottom-[calc(100svh-(100svh-12rem))]">
									<article className="image_overlay flex flex-col gap-3 z-20 text-left pl-20 lg:pl-48 w-2/3">
										<h1 className="text-light text-5xl tracking-wide flex items-center gap-5">
											{imageByIndex(
												index
											).name.toUpperCase()}
											{imageByIndex(index).link ? (
												<Link
													href={
														imageByIndex(index).link
													}
													target="_blank"
												>
													<Info
														size={30}
														strokeWidth={1.5}
													/>
												</Link>
											) : (
												<></>
											)}
										</h1>
										<p className="text-light text-lg font-normal">
											{imageByIndex(index).desc}
										</p>
										<Button
											text="Use this style"
											type="button"
											className="w-fit text-light bg-soil !px-10 rounded-xl font-semibold mt-5"
										/>
									</article>
									<article className="flex flex-col gap-1 z-20 right-0 pr-20 pl-20 lg:w-1/3 lg:items-end">
										<h4 className="text-skin text-2xl">
											{imageByIndex(
												index
											).artist.name.toUpperCase()}
										</h4>
										<h5 className="text-light">
											{imageByIndex(index).artist.period}
										</h5>
										<h4 className="text-skin underline underline-offset-2 italic text-xl mt-3">
											{imageByIndex(index).art.name}
											{imageByIndex(index).art.year ? (
												<span className="font-thin">
													{", "}
													{
														imageByIndex(index).art
															.year
													}
												</span>
											) : (
												<></>
											)}
										</h4>
									</article>
								</section>
							</div>
						))}
					</div>
				</div>
				<PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
				<NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
				<div className="absolute bottom-0 w-full">
					<div className="embla__dots">
						{scrollSnaps.map((_, index) => (
							<DotButton
								key={index}
								selected={index === selectedIndex}
								onClick={() => scrollTo(index)}
							/>
						))}
					</div>
					<div className="carousel_footer bg-dark flex justify-around p-5">
						<Link href={"/create"} className="w-2/3 px-44">
							<ViewSomething
								text="Use your own style"
								className="text-light lg:text-xl"
							/>
						</Link>
						<GdscFooter className="cursor-pointer w-1/3 flex justify-end" />
					</div>
				</div>
			</div>
		</>
	);
};

export default EmblaCarousel;
