import Image from "next/image";
import heroMain from "@/assets/hero/heroMain.svg";
// import Button from "@/components/Button";
import ViewSomething from "@/components/ViewSomething";
import GdscFooter from "@/components/GdscFooter";

export default function Hero() {
	return (
		<main className="relative h-[calc(100vh-4.25rem)] bg-[url('../assets/hero/heroBg.svg')] bg-cover bg-center pl-20 lg:pl-24 pt-24 text-light">
			<section className="flex justify-center items-center gap-24 lg:gap-56">
				<aside>
					<Image src={heroMain} alt="Art" width={400} height={600} />
				</aside>
				<article>
					<h1 className="text-4xl lg:text-7xl">
						<span className="text-skin">Discover</span> art styles,
					</h1>
					<h1 className="text-4xl lg:text-7xl">
						<span className="text-soil">Stylize</span> images.
					</h1>
					{/* <Button
						text="Use this style"
						className="mt-24"
						onClick={() => {}}
					/> */}
					<ViewSomething text="View Gallery" className="mt-14" />
				</article>
			</section>
			<GdscFooter className="absolute bottom-10 right-10" />
		</main>
	);
}
