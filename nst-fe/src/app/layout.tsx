import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Art Gallery",
	description: "A place for stylizing your art and images",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={outfit.className}>
				<Toaster
					position="top-right"
					theme="dark"
					duration={3000}
					richColors
					closeButton
					pauseWhenPageIsHidden
					expand
				/>
				{children}
			</body>
		</html>
	);
}
