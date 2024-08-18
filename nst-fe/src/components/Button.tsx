interface ButtonProps {
	text: string;
	className?: string;
	type: "button" | "submit" | "reset";
	onClick?: () => void;
}

export default function Button({
	text,
	className,
	type,
	onClick,
}: ButtonProps) {
	return (
		<button
			type={type}
			className={`py-2 px-5 text-xl rounded-lg bg-skin ${className}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
}
