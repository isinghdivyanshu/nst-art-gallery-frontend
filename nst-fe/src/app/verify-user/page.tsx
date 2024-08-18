import Image from "next/image";
import aside from "@/assets/auth/aside.svg";
import GdscFooter from "@/components/GdscFooter";
import EnterOtpForm from "../../components/VerifyUserForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function OtpVerification() {
	return (
		<main className="w-screen h-screen overflow-hidden flex text-light bg-dark">
			<Link href={"/login"}>
				<ChevronLeft className="fixed top-10 left-10 cursor-pointer size-10 hover:-translate-x-2 transition duration-00 z-10" />
			</Link>
			<header className="fixed top-10 flex w-3/5 justify-center items-center text-xl font-semibold">
				Logo
			</header>
			<section className=" w-3/5 h-full p-10 top-44 relative">
				<EnterOtpForm />
			</section>
			<aside className="w-2/5 bg-gradient-to-br from-[rgba(55,51,55,1)] to-darker flex justify-center items-center">
				<Image
					src={aside}
					height={100}
					width={100}
					alt="Art"
					priority
					className="w-4/5 h-auto"
				/>
			</aside>
			<GdscFooter className="absolute right-10 bottom-10" />
		</main>
	);
}
