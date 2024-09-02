"use client";

import { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";
import { handleSignUp } from "@/services/service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store";

export default function SignUpForm() {
	const [isPending, setIsPending] = useState<boolean>(false);
	const router = useRouter();
	const { setEmail } = useStore();

	return (
		<>
			<h1 className="text-4xl text-light flex justify-center mb-20 font-semibold">
				Sign Up
			</h1>
			<form
				onSubmit={callHandleSignUp}
				className={`w-3/4 flex flex-col gap-5 justify-center items-center mx-auto ${
					isPending ? "cursor-progress" : ""
				}`}
			>
				<Input
					type="text"
					label="Name"
					id="name"
					placeholder="Jon Doe"
					required={true}
					groupClassName="w-full"
				/>
				<Input
					type="email"
					label="Email"
					id="email"
					placeholder="abc@email.com"
					required={true}
					groupClassName="w-full"
				/>
				<Input
					type="password"
					label="Password"
					id="password"
					placeholder="* * * * * * * *"
					required={true}
					groupClassName="w-full"
				/>
				<Input
					type="password"
					label="Confirm Password"
					id="cPassword"
					placeholder="* * * * * * * *"
					required={true}
					groupClassName="w-full"
				/>
				<Button
					type="submit"
					text="Sign Up"
					className="w-1/2 lg:w-1/3 my-10 mx-auto bg-skin text-darker font-semibold"
					disabled={isPending}
				/>
			</form>
			<Link href={"/login"} className={`${isPending ? "hidden" : ""}`}>
				<div className="group flex justify-center cursor-pointer">
					<span className="inline-block mx-1">Already a member?</span>
					<span className="inline-block mx-1 text-soil group-hover:translate-x-2 transition duration-300">
						Log In
					</span>
				</div>
			</Link>
		</>
	);

	async function callHandleSignUp(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsPending(true);

		const formData = new FormData(event.currentTarget);
		const dataObject = Object.fromEntries(formData.entries()) as {
			name: string;
			email: string;
			password: string;
			cPassword: string;
		};
		const { name, email, password, cPassword } = dataObject;

		if (password != cPassword) {
			toast.error("Passwords do not match");
			return;
		}

		const res = await handleSignUp({ name, email, password });

		if (res?.status === "success") {
			toast.success(res.message);
			setEmail(email);
			router.replace("/verify-user");
		} else if (res?.status === "error") {
			toast.error(res.message);
		}

		if (res?.serverError) {
			toast.error(res.message);
			console.log(res.error);
		}

		setIsPending(false);
	}
}
