"use client";

import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { handleResetPassword } from "@/services/service";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResetPasswordForm() {
	const router = useRouter();
	const { email } = useStore() as {
		email: string;
	};

	return (
		<>
			<h1 className="text-4xl text-light flex justify-center mb-10 font-semibold">
				Reset Password
			</h1>
			<h2 className="text-soil text-center flex justify-center mb-20">
				Enter a new password to reset the password to your account
			</h2>
			<form
				onSubmit={callHandleResetPassword}
				className="w-3/4 flex flex-col gap-5 justify-center items-center mx-auto"
			>
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
					text="Reset Password"
					className="w-1/2 lg:w-1/3 my-14 mx-auto text-darker font-semibold"
				/>
			</form>
			<Link href={"/login"}>
				<div className="group flex justify-center cursor-pointer">
					<span className="inline-block mx-1">
						Know your password??
					</span>
					<span className="inline-block mx-1 text-soil group-hover:translate-x-2 transition duration-300">
						Log In
					</span>
				</div>
			</Link>
		</>
	);

	async function callHandleResetPassword(
		event: React.FormEvent<HTMLFormElement>
	) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const dataObject = Object.fromEntries(formData.entries()) as {
			password: string;
			cPassword: string;
		};

		const { password, cPassword } = dataObject;
		if (password != cPassword) {
			toast.error("Passwords do not match");
			return;
		}

		const otp: string | null = localStorage.getItem("otp");

		const res = await handleResetPassword({
			email,
			password,
			otp,
		});

		if (res?.status === "success") {
			toast.success(res.message);
			localStorage.removeItem("otp");
			router.replace("/login");
		} else if (res?.status === "error") {
			toast.error(res.message);
		}

		if (res?.serverError) {
			toast.error(res.message);
			console.log(res.error);
		}
	}
}
