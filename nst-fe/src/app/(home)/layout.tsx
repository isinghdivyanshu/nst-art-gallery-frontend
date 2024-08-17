import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="h-screen overflow-x-hidden">
			<Navbar />
			{children}
		</main>
	);
}
