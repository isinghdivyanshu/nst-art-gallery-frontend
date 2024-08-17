"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
	type: string;
	label: string;
	id: string;
	placeholder: string;
	groupClassName?: string;
	inputClassName?: string;
	required: boolean;
}

export default function Input({
	type,
	label,
	id,
	placeholder,
	groupClassName,
	inputClassName,
	required,
}: InputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<div className={`flex flex-col gap-1 ${groupClassName}`}>
			<label htmlFor={id} className="font-semibold ml-3">
				{label}
			</label>
			{type != "password" ? (
				<input
					type={type}
					name={id}
					id={id}
					placeholder={placeholder}
					className={`bg-dark border border-slate-600 rounded-md py-1 px-3 focus:ring-0 focus:outline-none focus:border-0 focus:border-l-2 focus:border-b-2 focus:border-light focus:rounded-none ${inputClassName}`}
					required={required}
				/>
			) : (
				<div className="relative">
					<input
						type={isPasswordVisible ? "text" : "password"}
						name={id}
						id={id}
						placeholder={placeholder}
						className={`bg-dark border border-slate-600 rounded-md py-1 px-3 focus:ring-0 focus:outline-none focus:border-0 focus:border-l-2 focus:border-b-2 focus:border-light focus:rounded-none w-full ${inputClassName}`}
						required={required}
						minLength={8}
					/>
					{!isPasswordVisible ? (
						<Eye
							onClick={handleVisiblePassword}
							className="absolute cursor-pointer right-2 top-1"
						/>
					) : (
						<EyeOff
							onClick={handleVisiblePassword}
							className="absolute cursor-pointer right-2 top-1"
						/>
					)}
				</div>
			)}
		</div>
	);

	function handleVisiblePassword() {
		setIsPasswordVisible(!isPasswordVisible);
	}
}
