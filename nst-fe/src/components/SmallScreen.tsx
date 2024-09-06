import GdscFooter from "./GdscFooter";
import tabletImage from "../assets/smallScreen/tablet.png";
import phoneImage from "../assets/smallScreen/phone.png";
import Image from "next/image";

export default function SmallScreen() {
	return (
		<>
			<main className="relative bg-darker text-light md:hidden h-screen w-screen overflow-hidden">
				<GdscFooter className="absolute top-10 right-10" />
				<article className="absolute bottom-0 flex flex-col gap-36 h-4/5 w-full items-center pt-48 px-5">
					<section className="text-skin text-xl">
						<p className="mb-5">
							This is best experienced on the app
						</p>
						<p>Download Now</p>
					</section>
					<section className="w-1/2 h-full">
						<Image
							src={phoneImage}
							alt="Phone"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</section>
				</article>
			</main>
			<main className="relative bg-darker text-light hidden md:block h-screen w-screen overflow-hidden p-20">
				<article className="flex gap-10 items-center h-full">
					<section className="w-1/2 h-1/2 text-3xl text-skin">
						<p className="mb-14">
							This is best experienced on the app
						</p>
						<p>Download Now</p>
					</section>
					<section className="w-1/2 h-1/2">
						<Image
							src={tabletImage}
							alt="Tablet"
							width={100}
							height={100}
							className="w-full h-full"
						/>
					</section>
				</article>
				<GdscFooter className="absolute right-10 bottom-10" />
			</main>
		</>
	);
}
