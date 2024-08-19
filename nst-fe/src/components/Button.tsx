interface ButtonProps {
	text: string;
	className?: string;
	type: "button" | "submit" | "reset";
	name?: string;
	disabled?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
	text,
	className,
	type,
	name,
	disabled,
	onClick,
}: ButtonProps) {
	return (
		<button
			type={type}
			className={`py-2 px-5 text-xl rounded-lg bg-skin disabled:cursor-progress disabled:opacity-30 ${className}`}
			onClick={onClick}
			name={name}
			disabled={disabled}
		>
			{text}
		</button>
	);
}
