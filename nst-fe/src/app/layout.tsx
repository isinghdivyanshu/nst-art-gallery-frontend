import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SmallScreen from "@/components/SmallScreen";
import ContextProvider from "@/providers/contextProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Artium",
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
				<div className="lg:hidden">
					<SmallScreen />
				</div>
				<div className="hidden lg:block">
					<Toaster
						position="top-right"
						duration={3000}
						richColors
						closeButton
						pauseWhenPageIsHidden
						expand
					/>
					<ContextProvider>{children}</ContextProvider>
				</div>
			</body>
		</html>
	);
}
