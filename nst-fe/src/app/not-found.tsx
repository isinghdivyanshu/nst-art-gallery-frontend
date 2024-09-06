import Image from "next/image";
import heroMain from "@/assets/hero/heroMain.svg";
import Navbar from "@/components/navbar/Navbar";

export default function NotFound() {
	return (
		<>
			<nav>
				<Navbar />
			</nav>
			<main className="relative h-[calc(100svh-4.25rem)] bg-[url('../assets/hero/heroBg.svg')] bg-cover bg-center pl-20 lg:pl-24 pt-24 text-light flex justify-center items-center">
				<section className="flex justify-center items-center gap-10 pb-10">
					<article className="text-8xl">
						<p className="text-skin text-9xl mb-5">404/</p>
						<p className="mb-5">PAGE NOT </p>
						<p className="">FOUND</p>
					</article>
					<aside>
						<Image
							src={heroMain}
							alt="Art"
							width={400}
							height={800}
							priority
						/>
					</aside>
				</section>
			</main>
		</>
	);
}
