interface GdscFooterProps {
	className: string;
}

export default function GdscFooter({ className }: GdscFooterProps) {
	return (
		<article
			className={`text-light lg:text-xl cursor-pointer ${className}`}
		>
			Made with{" "}
			<span className="text-red-500">&nbsp; &#10084; &nbsp;</span> by
			GDSC-VIT
		</article>
	);
}
