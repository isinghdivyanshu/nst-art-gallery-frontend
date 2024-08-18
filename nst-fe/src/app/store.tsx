import { create } from "zustand";

interface StoreState {
	name: string;
	email: string;
	token: string;
	isLoggedIn: boolean;
	setEmail: (email: string) => void;
	login: (email: string, token: string, name: string) => void;
	logout: () => void;
	initializeFromLocalStorage: () => void;
}

export const useStore = create<StoreState>((set) => ({
	name: "",
	email: "",
	setEmail: (email) => {
		localStorage.setItem("email", email);
		set({ email: email });
	},

	token: "",
	isLoggedIn: false,
	login: (email, token, name) => {
		localStorage.setItem("email", email);
		localStorage.setItem("name", name);
		localStorage.setItem("token", token);

		set({
			isLoggedIn: true,
			email: email,
			token: token,
			name: name,
		});
	},
	logout: () => {
		set({
			isLoggedIn: false,
			email: "",
			token: "",
			name: "",
		});

		localStorage.removeItem("email");
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("expiry");
	},

	initializeFromLocalStorage: () => {
		const email = localStorage.getItem("email");
		const token = localStorage.getItem("token");
		const name = localStorage.getItem("name");
		if (email && token && name) {
			set({
				isLoggedIn: true,
				email: email,
				token: token,
				name: name,
			});
		}
		if (name) {
			set({ name: name });
		}
		if (email) {
			set({ email: email });
		}
	},
}));
