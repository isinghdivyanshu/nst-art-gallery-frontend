"use client";

import Input from "./Input";
import Button from "./Button";
import Link from "next/link";

export default function SignUpForm() {
	return (
		<>
			<h1 className="text-4xl text-light flex justify-center mb-20 font-semibold">
				Sign Up
			</h1>
			<form
				onSubmit={handleSignUp}
				className="w-3/4 flex flex-col gap-5 justify-center items-center mx-auto"
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
				/>
			</form>
			<Link href={"/login"}>
				<div className="group flex justify-center cursor-pointer">
					<span className="inline-block mx-1">Already a member?</span>
					<span className="inline-block mx-1 text-soil group-hover:translate-x-2 transition duration-300">
						Log In
					</span>
				</div>
			</Link>
		</>
	);

	async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const dataObject = Object.fromEntries(formData.entries());
		console.log(dataObject);
	}
}
