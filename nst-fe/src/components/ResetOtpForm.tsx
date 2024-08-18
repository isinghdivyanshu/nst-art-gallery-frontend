"use client";

import Input from "./Input";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store";
import { handleVerify } from "@/services/service";
import { handleResetOtp } from "@/services/service";
import { toast } from "sonner";

export default function ResetOtpForm() {
	const router = useRouter();
	const { email } = useStore() as {
		email: string;
	};

	return (
		<>
			<h1 className="text-4xl text-light flex justify-center mb-10 font-semibold">
				Enter OTP
			</h1>
			<h2 className="text-soil text-center flex justify-center mb-20">
				{`Enter the OTP you received on your mail ${email}. OTP valid for only 30 minutes`}
			</h2>
			<form
				onSubmit={callHandleVerify}
				className="w-3/4 flex flex-col gap-5 justify-center items-center mx-auto"
			>
				<Input
					type="text"
					label="OTP"
					id="otp"
					placeholder="OTP here"
					required={true}
					groupClassName="w-full"
				/>
				<Button
					type="submit"
					text="Reset Password"
					className="w-1/2 lg:w-1/3 my-14 mx-auto text-darker font-semibold"
				/>
			</form>
			<div
				className="group flex justify-center cursor-pointer"
				onClick={handleResend}
			>
				<span className="inline-block mx-1">Resend OTP?</span>
				<span className="inline-block mx-1 text-soil group-hover:translate-x-2 transition duration-300">
					{email}
				</span>
			</div>
		</>
	);

	async function callHandleVerify(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const dataObject = Object.fromEntries(formData.entries()) as {
			otp: string;
		};

		const { otp } = dataObject;
		console.log(otp);

		const res = await handleVerify({ email, otp });

		if (res?.status === "success") {
			toast.success(res.message);
			localStorage.setItem("otp", otp);
			router.replace("/reset-password");
		} else if (res?.status === "error") {
			toast.error(res.message);
		}

		if (res?.serverError) {
			toast.error(res.message);
			console.log(res.error);
		}
	}

	async function handleResend() {
		const res = await handleResetOtp(email);

		if (res?.status === "success") {
			toast.success(res.message);
		} else if (res?.status === "error") {
			toast.error(res.message);
		}

		if (res?.serverError) {
			toast.error(res.message);
			console.log(res.error);
		}
	}
}
