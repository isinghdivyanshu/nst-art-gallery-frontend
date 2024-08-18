import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ContextProvider from "@/providers/contextProvider";

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
					duration={3000}
					richColors
					closeButton
					pauseWhenPageIsHidden
					expand
				/>
				<ContextProvider>{children}</ContextProvider>
			</body>
		</html>
	);
}
