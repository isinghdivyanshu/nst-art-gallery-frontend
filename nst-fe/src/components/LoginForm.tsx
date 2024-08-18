"use client";

import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { handleLogin } from "@/services/service";
import { toast } from "sonner";

export default function LoginForm() {
	return (
		<>
			<h1 className="text-4xl text-light flex justify-center mb-20 font-semibold">
				Log In
			</h1>
			<form
				onSubmit={callHandleLogin}
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
				<Input
					type="password"
					label="Password"
					id="password"
					placeholder="* * * * * * * *"
					required={true}
					groupClassName="w-full"
				/>
				<Link
					href={"/otp-verification"}
					className="text-sm hover:underline cursor-pointer text-soil self-end"
				>
					Forgot password?
				</Link>
				<Button
					type="submit"
					text="Sign Up"
					className="w-1/2 lg:w-1/3 my-14 mx-auto bg-skin text-darker font-semibold"
				/>
			</form>
			<Link href={"/register"}>
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
		const formData = new FormData(event.currentTarget);
		const dataObject = Object.fromEntries(formData.entries()) as {
			email: string;
			password: string;
		};
		const { email, password } = dataObject;

		const res = await handleLogin({ email, password });

		if (!res?.error) {
			toast.success(res?.message);
			console.log(res?.response);
		}

		if (res?.error) {
			toast.error(res.message);
			console.log(res.message);
		}
	}
}
