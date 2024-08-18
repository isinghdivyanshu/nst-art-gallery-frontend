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
			console.log("[SUCCESS RESPONSE] -->", res);
			return {
				serverError: false,
				response: res,
				status: res.status,
				message: res.message,
			};
		}

		if (!response.ok) {
			const res = await response.json();
			console.log("[ERROR RESPONSE] -->", res);
			return {
				serverError: false,
				response: res,
				status: res.status,
				message: res.message,
			};
		}
	} catch (error: any) {
		console.log("SERVER ERROR =>", error);
		return {
			serverError: true,
			error: error,
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

//Verify any OTP
interface handleVerifyProps {
	email: string;
	otp: string;
}
export async function handleVerify({ email, otp }: handleVerifyProps) {
	const verify = await fetchEndpoint({
		endPoint: `/auth/verify?email=${email}&otp=${otp}`,
		method: "GET",
		header: false,
	});

	return verify;
}

//Resend any OTP
export async function handleResendOtp(email: string) {
	const resend = await fetchEndpoint({
		endPoint: `/auth/request-otp?email=${email}`,
		method: "GET",
		header: false,
	});

	return resend;
}

//Send reset password OTP
export async function handleResetOtp(email: string) {
	const otp = await fetchEndpoint({
		endPoint: `/auth/reset-password?email=${email}`,
		method: "GET",
		header: false,
	});

	return otp;
}

//Reset password
interface handleResetPasswordProps {
	email: string;
	password: string;
	otp: string | null;
}
export async function handleResetPassword({
	email,
	password,
	otp,
}: handleResetPasswordProps) {
	const reset = await fetchEndpoint({
		endPoint: "/auth/set-forgotten-password",
		method: "POST",
		header: false,
		reqBody: {
			email: email,
			password: password,
			otp: otp,
		},
	});

	return reset;
}
