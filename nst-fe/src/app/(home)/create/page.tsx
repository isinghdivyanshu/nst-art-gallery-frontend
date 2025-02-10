"use client";

import { useRef, useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import CallModal from "@/components/modal/CallModal";
import { useRouter } from "next/navigation";
import { createArt } from "@/services/service";
import { toast } from "sonner";
import { useArtStore } from "@/store/ArtStore";

export default function CreateArt() {
	const router = useRouter();
	const [isPending, setIsPending] = useState<boolean>(false);
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const contentFileInput = useRef<HTMLInputElement>(null);
	const styleFileInput = useRef<HTMLInputElement>(null);
	const [contentImageData, setContentImageData] = useState<{
		src: string;
		name: string;
	}>({
		src: "",
		name: "",
	});
	const [styleImageData, setStyleImageData] = useState<{
		src: string;
		name: string;
	}>({
		src: "",
		name: "",
	});
	const [styleStrength, setStyleStrength] = useState<string>("0.8");

	const toggleModal = () => {
		setModalIsOpen(!modalIsOpen);
	};

	const handleClick = (ref: React.RefObject<HTMLInputElement>) => {
		ref.current?.click();
	};

	const handleChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
		setImageData: React.Dispatch<
			React.SetStateAction<{
				src: string;
				name: string;
			}>
		>
	) => {
		const fileUploaded = event.target.files?.[0];
		if (fileUploaded) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setImageData({
					src: reader.result as string,
					name: fileUploaded.name,
				});
			};
			reader.readAsDataURL(fileUploaded);
		}
	};

	const handleStrengthChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setStyleStrength(event.target.value);
	};

	return (
		<form className={`min-h-[calc(100svh-4.25rem)] w-screen bg-dark ${isPending ? "cursor-wait" : "cursor-auto"}`}>
			<section className="flex flex-col lg:flex-row gap-20 items-center">
				<article className="flex flex-col justify-center lg:items-end  w-1/2 p-16 xl:p-28">
					<div className="flex flex-col justify-normal items-center gap-5">
						<h1 className="text-2xl text-soil font-semibold tracking-widest text-center">
							Primary Image
						</h1>
						<div className="border border-soil flex justify-center items-center w-80 h-80 overflow-hidden p-2">
							{contentImageData.src ? (
								<div className="group relative w-full h-full">
									<Image
										width={100}
										height={100}
										src={contentImageData.src}
										alt={
											contentImageData.name ?? "Uploaded"
										}
										className="w-full h-full text-light"
									/>
									<div className="absolute top-0 left-0 w-full h-full bg-dark opacity-0 flex justify-center items-center group-hover:opacity-75 transition duration-500">
										<Button
											className="backdrop-blur-3xl bg-transparent border border-light text-light text-sm font-bold tracking-tighter px-8 py-1"
											type="button"
											text="Upload Image"
											onClick={() =>
												handleClick(contentFileInput)
											}
										/>
									</div>
								</div>
							) : (
								<Button
									className="!bg-light text-dark"
									type="button"
									text="Upload"
									onClick={() =>
										handleClick(contentFileInput)
									}
								/>
							)}
						</div>
						<input
							type="file"
							onChange={(e) =>
								handleChange(e, setContentImageData)
							}
							ref={contentFileInput}
							style={{ display: "none" }}
							accept="image/*"
						/>
						<h1 className="text-light text-xl">
							{contentImageData.name}
						</h1>
					</div>
				</article>
				<article className="flex flex-col justify-center lg:items-start  w-1/2 p-16 xl:p-28">
					<div className="flex flex-col justify-normal items-center gap-5">
						<h1 className="text-2xl text-soil font-semibold tracking-widest text-center">
							Art Style
						</h1>
						<div className="border border-soil flex justify-center items-center w-80 h-80 overflow-hidden p-2">
							{styleImageData.src ? (
								<div className="group relative w-full h-full">
									<Image
										width={100}
										height={100}
										src={styleImageData.src}
										alt={styleImageData.name ?? "Uploaded"}
										className="w-full h-full text-light"
									/>
									<div className="absolute top-0 left-0 min-w-full min-h-full bg-dark opacity-0 flex flex-col gap-5 justify-center group-hover:opacity-75 transition duration-500 items-stretch p-5">
										<Button
											className="backdrop-blur-3xl bg-transparent border border-light text-light text-sm font-bold tracking-tighter px-8 py-1"
											type="button"
											text="Choose from our styles"
											onClick={toggleModal}
										/>
										<Button
											className="backdrop-blur-3xl bg-transparent border border-light text-light text-sm font-bold tracking-tighter px-8 py-1"
											type="button"
											text="Upload Style"
											onClick={() =>
												handleClick(styleFileInput)
											}
										/>
									</div>
								</div>
							) : (
								<Button
									className="!bg-light text-dark"
									type="button"
									text="Upload"
									onClick={() => handleClick(styleFileInput)}
								/>
							)}
						</div>
						<input
							type="file"
							onChange={(e) => handleChange(e, setStyleImageData)}
							ref={styleFileInput}
							style={{ display: "none" }}
							accept="image/*"
						/>
						<h1 className="text-light text-xl">
							{styleImageData.name}
						</h1>
					</div>
				</article>
			</section>
			<div className="flex flex-col gap-10 items-center">
				<div className="group relative  flex flex-col gap-5 text-light">
					<label
						htmlFor="styleStrength"
						className="tracking-wide ml-3 text-3xl"
					>
						STYLIZATION STRENGTH
					</label>
					<input
						type="range"
						id="styleStrength"
						className="accent-light appearance-none h-1 group"
						onChange={(e) => handleStrengthChange(e)}
						value={styleStrength}
						min="0.1"
						max="1"
						step="0.1"
					/>
					<h5 className="absolute -top-10 left-1/2 opacity-0 group-hover:opacity-100 transition duration-300 text-skin italic text-lg font-semibold">
						{styleStrength}
					</h5>
				</div>
				<Button
					type="button"
					text="Stylize"
					className="font-medium text-light bg-soil px-14 mb-20"
					disabled={isPending}
					onClick={handleStylize}
				/>
			</div>
			<CallModal
				modalType="ShowAllArtModal"
				isOpen={modalIsOpen}
				onReqClose={toggleModal}
			/>
		</form>
	);

	async function handleStylize(event: any) {
		event.preventDefault();
		setIsPending(true);

		try {
			const contentFile = contentFileInput.current?.files?.[0];
			const styleFile = styleFileInput.current?.files?.[0];

			if (!contentFile || !styleFile) {
				toast.error("Please select both images");
				return;
			}

			const content_image = await new Promise<string>((resolve) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64String = reader.result as string;
					resolve(base64String.split(',')[1]);
				};
				reader.readAsDataURL(contentFile);
			});

			const style_image = await new Promise<string>((resolve) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64String = reader.result as string;
					resolve(base64String.split(',')[1]);
				};
				reader.readAsDataURL(styleFile);
			});

			const token = localStorage.getItem("token");
			if (!token) {
				toast.error("Please login to stylize art");
				return;
			}

			const stylize = await createArt({ token, content_image, style_image });

			if (stylize?.status === "success") {
				toast.success(stylize.message);

				const base64Response = stylize.image;
				const response = await fetch(base64Response);
				const blob = await response.blob();

				// Create a File object from the Blob
				const stylizedFile = new File([blob], 'stylized-art.jpg', {
					type: 'image/jpg',
					lastModified: Date.now()
				});

				// Store the File object in Zustand
				useArtStore.getState().setStylizedImage(stylizedFile);
				router.push("/preview");
			} else if (stylize?.status === "error") {
				toast.error(stylize.message);
			}
		} catch (error) {
			toast.error("An error occurred. Please try again later.");
			console.error(error);
		} finally {
			setIsPending(false);
		}
	}
}