"use client";

import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleResetOtp } from "@/services/service";
import { toast } from "sonner";
import { useStore } from "@/app/store";

export default function ResetMailForm() {
	const router = useRouter();
	const { setEmail } = useStore();
	return (
		<>
			<h1 className="text-4xl text-light flex justify-center mb-10 font-semibold">
				Reset Password
			</h1>
			<h2 className="text-soil text-center flex justify-center mb-20">
				Enter your email address and we&apos;ll send you a one time
				password valid for 30 minutes
			</h2>
			<form
				onSubmit={callHandleResetOtp}
				className="w-3/4 flex flex-col gap-5 justify-center items-center mx-auto"
			>
				<Input
					type="email"
					label="Email"
					id="email"
					placeholder="abc@email.com"
					required={true}
					groupClassName="w-full"
				/>
				<Button
					type="submit"
					text="Send OTP"
					className="w-1/2 lg:w-1/3 my-14 mx-auto text-darker font-semibold"
				/>
			</form>
			<Link href={"/login"}>
				<div className="group flex justify-center cursor-pointer">
					<span className="inline-block mx-1">
						Know your password?
					</span>
					<span className="inline-block mx-1 text-soil group-hover:translate-x-2 transition duration-300">
						Log In
					</span>
				</div>
			</Link>
		</>
	);

	async function callHandleResetOtp(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const dataObject = Object.fromEntries(formData.entries()) as {
			email: string;
		};

		const { email } = dataObject;

		const res = await handleResetOtp(email);

		if (res?.status === "success") {
			toast.success(res.message);
			setEmail(email);
			router.replace("/verify-otp");
		} else if (
			res?.status === "error" &&
			res?.message.includes("not verified")
		) {
			setEmail(email);
			toast.error(res.message);
			router.push("/otp-verify");
		} else if (res?.status === "error") {
			toast.error(res.message);
		}

		if (res?.serverError) {
			toast.error(res.message);
			console.log(res.error);
		}
	}
}
