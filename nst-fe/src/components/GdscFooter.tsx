interface GdscFooterProps {
	className: string;
}

export default function GdscFooter({ className }: GdscFooterProps) {
	return (
		<article className={`${className}`}>
			Made with{" "}
			<span className="text-red-500">&nbsp; &#10084; &nbsp;</span> by
			GDSC-VIT
		</article>
	);
}
