interface ButtonProps {
	text: string;
	className: string;
	onClick: () => void;
}

export default function Button({ text, className, onClick }: ButtonProps) {
	return (
		<button className={`py-2 px-5 text-xl rounded-lg bg-soil ${className}`}>
			{text}
		</button>
	);
}
