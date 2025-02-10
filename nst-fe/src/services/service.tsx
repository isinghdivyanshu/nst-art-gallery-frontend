"use server";

import { headers } from "next/headers";

//Global fetch function
interface fetchEndpointProps {
	endPoint: string;
	method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
	auth?: true;
	addHeader?: { [key: string]: string };
	reqBody?: object;
	token?: string | null;
	formData?: FormData;
}

export async function fetchEndpoint({
	endPoint,
	method,
	auth,
	addHeader,
	reqBody,
	token,
	formData,
}: fetchEndpointProps) {
	const baseURL = process.env.BASE_URL || "http://localhost:8000";

	const URL = `${baseURL}${endPoint}`;
	console.clear();
	console.log("\n\n[URL] -->", URL);
	console.log("[TIME] -->", new Date().toLocaleTimeString());

	let headers = auth
		? {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		}
		: formData ? {} : { "Content-Type": "application/json" };
	headers = {
		...headers,
		...addHeader,
	};
	console.log("[HEADERS] -->", headers);

	let body = reqBody ? JSON.stringify(reqBody) : undefined;

	try {
		const response = await fetch(URL, {
			method: method,
			headers: headers as HeadersInit,
			cache: "no-store",
			body: body,
		});
		console.log("[RESPONSE] -->", response);

		if (response.ok) {
			const res = await response.json();
			console.log("[SUCCESS RESPONSE] -->", res);
			return {
				serverError: false,
				response: res,
				status: res.status,
				message: res.message,
				likes: res.likes,
				id: res.id,
				image: res.image ? res.image : null,
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
	});

	return verify;
}

//Resend any OTP
export async function handleResendOtp(email: string) {
	const resend = await fetchEndpoint({
		endPoint: `/auth/request-otp?email=${email}`,
		method: "GET",
	});

	return resend;
}

//Send reset password OTP
export async function handleResetOtp(email: string) {
	const otp = await fetchEndpoint({
		endPoint: `/auth/reset-password?email=${email}`,
		method: "GET",
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
		reqBody: {
			email: email,
			password: password,
			otp: otp,
		},
	});

	return reset;
}

//-----------GALLERY-----------
// Get all arts
export async function getAllArts(page: number = 1) {
	const response: any = await fetchEndpoint({
		endPoint: `/art/gallery?page=${page}`,
		method: "GET",
	});
	return response;
}

// Like an art
interface handleLikeProps {
	artSlug: string;
}
export async function handleLike({ artSlug }: handleLikeProps, token: string) {
	const response = await fetchEndpoint({
		endPoint: `/art/like/${artSlug}`,
		method: "POST",
		auth: true,
		token: token,
	});

	return response;
}


//-----------THEME-----------
// Get theme of the day
export async function getThemeOfTheDay() {
	const response = await fetchEndpoint({
		endPoint: "/theme/theme-of-day",
		method: "GET",
	});
	console.log("THEME OF THE DAY =>", response);
	return response;
}

export async function getAllThemes() {
	const response = await fetchEndpoint({
		endPoint: "/theme/",
		method: "GET",
	});
	return response;
}


//-----------PROFILE-----------
// Get user arts
export async function getAllUserArts(id: string) {
	const response = fetchEndpoint({
		endPoint: `/art/user/${id}`,
		method: "GET",
	});

	return response;
}

// Delete an art
interface deleteArtProps {
	artSlug: string;
}
export async function deleteArt({ artSlug }: deleteArtProps, token: string) {
	const response = await fetchEndpoint({
		endPoint: `/art/delete/${artSlug}`,
		method: "DELETE",
		auth: true,
		token: token,
	});

	return response;
}

// // Add/Make an art
interface handleStyliseProps {
	token: string | null;
	content_image: string;
	style_image: string;
}
export async function createArt({ token, content_image, style_image }: handleStyliseProps) {
	const response = await fetchEndpoint({
		endPoint: `/art/model`,
		method: "POST",
		auth: true,
		token: token,
		reqBody: {
			"content_image": content_image,
			"style_image": style_image
		}
	});
	return response;
}

// -----------PUBLISH-----------
// Publish an art
interface SaveArtProps {
	token: string;
	image: string;
	theme: string;
	title: string;
	description: string;
}

export async function saveArt({ token, theme,image,title,description }: SaveArtProps) {
	return await fetchEndpoint({
		endPoint: `/art/create`,
		method: "POST",
		auth: true,
		token,
		reqBody: {
			"theme": theme,
			"image": image,
			"title": title,
			"description": description,
		},
	});
}

export async function publishArt(token: string, artSlug: string) {
	const response = await fetchEndpoint({
		endPoint: `/art/publish/${artSlug}`,
		method: "POST",
		auth: true,
		token: token,
	});

	return response;
}