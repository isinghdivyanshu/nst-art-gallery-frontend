"use client";

import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleLogin } from "@/services/service";
import { toast } from "sonner";
import { useStore } from "@/app/store";

export default function LoginForm() {
	const [isPending, setIsPending] = useState<boolean>(false);
	const router = useRouter();
	const { setEmail, login } = useStore();

	return (
		<>
			<h1 className="text-4xl text-light flex justify-center mb-20 font-semibold">
				Log In
			</h1>
			<form
				onSubmit={callHandleLogin}
				className={`w-3/4 flex flex-col gap-5 justify-center items-center mx-auto ${
					isPending ? "cursor-progress" : ""
				}`}
			>
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
				<Link
					href={"/send-otp"}
					className="text-sm hover:underline cursor-pointer text-soil self-end"
				>
					Forgot password?
				</Link>
				<Button
					type="submit"
					text="Log In"
					className="w-1/2 lg:w-1/3 my-14 mx-auto bg-skin text-darker font-semibold"
					disabled={isPending}
				/>
			</form>
			<Link href={"/register"} className={`${isPending ? "hidden" : ""}`}>
				<div className="group flex justify-center cursor-pointer">
					<span className="inline-block mx-1">Not a member?</span>
					<span className="inline-block mx-1 text-soil group-hover:translate-x-2 transition duration-300">
						Sign Up
					</span>
				</div>
			</Link>
		</>
	);

	async function callHandleLogin(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsPending(true);

		const formData = new FormData(event.currentTarget);
		const dataObject = Object.fromEntries(formData.entries()) as {
			email: string;
			password: string;
		};
		const { email, password } = dataObject;

		const res = await handleLogin({ email, password });

		if (res?.status === "success") {
			toast.success(res.message);
			login(
				res.response.user.email,
				res.response.token,
				res.response.user.name
			);
			router.replace("/create");
		} else if (
			res?.status === "error" &&
			res?.message.includes("not verified")
		) {
			setEmail(email);
			toast.error(res.message);
			router.push("/verify-user");
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
