import { ChevronRight } from "lucide-react";

interface ViewSomethingProps {
	text: string;
	className: string;
}

export default function ViewSomething({ text, className }: ViewSomethingProps) {
	return (
		<div
			className={`group flex gap-5 items-center cursor-pointer ${className}`}
		>
			<span className="underline underline-offset-2">{text}</span>
			<ChevronRight className="group-hover:translate-x-5 transition duration-300" />
		</div>
	);
}
