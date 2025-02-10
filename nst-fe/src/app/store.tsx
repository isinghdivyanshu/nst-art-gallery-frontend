import { create } from "zustand";

interface StoreState {
	name: string;
	email: string;
	token: string;
	id: string;
	isLoggedIn: boolean;
	setEmail: (email: string) => void;
	login: (email: string, token: string, name: string, id: string) => void;
	logout: () => void;
	initializeFromLocalStorage: () => void;
}

export const useStore = create<StoreState>((set) => ({
	name: "",
	email: "",
	id: "",
	setEmail: (email) => {
		localStorage.setItem("email", email);
		set({ email: email });
	},

	token: "",
	isLoggedIn: false,
	login: (email, token, name, id) => {
		localStorage.setItem("email", email);
		localStorage.setItem("name", name);
		localStorage.setItem("token", token);
		localStorage.setItem("id", id);

		set({
			isLoggedIn: true,
			email: email,
			token: token,
			name: name,
			id: id,
		});
	},
	logout: () => {
		set({
			isLoggedIn: false,
			email: "",
			token: "",
			name: "",
			id: "",
		});

		localStorage.removeItem("email");
		localStorage.removeItem("token");
		localStorage.removeItem("name");
		localStorage.removeItem("expiry");
		localStorage.removeItem("id");
	},

	initializeFromLocalStorage: () => {
		const email = localStorage.getItem("email");
		const token = localStorage.getItem("token");
		const name = localStorage.getItem("name");
		const id = localStorage.getItem("id");
		if (email && token && name && id) {
			set({
				isLoggedIn: true,
				email: email,
				token: token,
				name: name,
				id: id,
			});
		}
		if (name) {
			set({ name: name });
		}
		if (email) {
			set({ email: email });
		}
		if (id) {
			set({ id: id });
		}
	},
}));
