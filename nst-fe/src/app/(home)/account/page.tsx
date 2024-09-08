import Image, { StaticImageData } from "next/image";
import placeholder from "../../../../pictures/palceholder.jpg";
import SignOutButton from "@/components/account/signOutButton";
import ViewSomething from "@/components/ViewSomething";
import Link from "next/link";

export default function Account() {
	return (
		<main className="relative bg-dark py-20 px-48">
			<section className="relative bg-myGray py-10 px-5 flex flex-col items-center gap-2 mb-10">
				<Image
					src={placeholder}
					alt="Placeholder"
					width={200}
					height={200}
					className="rounded-full"
				/>
				<h1 className="text-3xl text-skin mt-5">Divyanshu Singh</h1>
				<h2 className="text-soil">isinghdivyanshu</h2>
				<SignOutButton />
			</section>
			<section>
				<h1 className="text-3xl text-light mb-5">Previous Art</h1>
				<section className="flex flex-wrap gap-2 items-center justify-center">
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
					<ArtCard />
				</section>
			</section>
			<Link href={"/create"}>
				<ViewSomething
					text="Create more art"
					className="text-light fixed bottom-10 right-5"
				/>
			</Link>
		</main>
	);
}

function ArtCard({ src }: { src?: StaticImageData }) {
	return (
		<article className="relative bg-mix p-2 flex flex-col w-52 overflow-hidden rounded-lg">
			<Image
				src={placeholder}
				alt="Placeholder"
				width={300}
				height={300}
			/>
			<p className="text-skin overflow-hidden whitespace-pre-line text-ellipsis mt-2 line-clamp-3 mb-2">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
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
				esse magnam.
			</p>
			<aside className="text-light self-end">27&nbsp;&nbsp;🤍</aside>
		</article>
	);
}
