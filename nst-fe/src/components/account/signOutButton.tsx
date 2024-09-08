"use client";

import { LogOut } from "lucide-react";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOutButton() {
	const router = useRouter();
	const { logout } = useStore();

	return (
		<button
			className="absolute top-5 right-5 text-xl text-skin flex gap-2 items-center"
			onClick={handleLogOut}
		>
			Sign out
			<LogOut />
		</button>
	);

	function handleLogOut() {
		logout();
		router.replace("/explore");
		toast.success("You have been logged out.");
	}
}
