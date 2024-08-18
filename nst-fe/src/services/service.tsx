"use server";

//Global fetch function
interface fetchEndpointProps {
	endPoint: string;
	method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
	header: boolean;
	reqBody?: object;
	token?: string | null;
}

export async function fetchEndpoint({
	endPoint,
	method,
	header,
	reqBody,
	token,
}: fetchEndpointProps) {
	const baseURL = process.env.BASE_URL || "http://localhost:8000";

	const URL = `${baseURL}${endPoint}`;
	console.clear();
	console.log("\n\n[URL] -->", URL);
	console.log("[TIME] -->", new Date().toLocaleTimeString());

	let headers = header
		? {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
		  }
		: { "Content-Type": "application/json" };

	let body = reqBody ? JSON.stringify(reqBody) : undefined;

	try {
		const response = await fetch(URL, {
			method: method,
			headers: headers as HeadersInit,
			cache: "no-store",
			body: body,
		});

		if (response.ok) {
			const res = await response.json();
			console.log("[RESPONSE] -->", res);
			return {
				error: false,
				response: res,
				message: res.message,
			};
		}

		if (!response.ok) {
			const error = await response.json();
			console.log("[ERROR] -->", error);
			return {
				error: true,
				status: response.status,
				message: error.message,
			};
		}
	} catch (error: any) {
		console.log("Error =>", error);
		return {
			error: true,
			status: error.status,
			message: error.statusText,
		};
	}
}

//-----------AUTH-----------
//Register
interface handleSignUpProps {
	name: string;
	email: string;
	password: string;
}

export async function handleSignUp({
	name,
	email,
	password,
}: handleSignUpProps) {
	const signUp = await fetchEndpoint({
		endPoint: "/auth/register",
		method: "POST",
		header: false,
		reqBody: {
			name: name,
			email: email,
			password: password,
		},
	});

	return signUp;
}

//Login
interface handleLoginProps {
	email: string;
	password: string;
}

export async function handleLogin({ email, password }: handleLoginProps) {
	const login = await fetchEndpoint({
		endPoint: "/auth/login",
		method: "POST",
		header: false,
		reqBody: {
			email: email,
			password: password,
		},
	});

	return login;
}
