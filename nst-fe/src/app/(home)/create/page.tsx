"use client";

import { useRef, useState } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import CallModal from "@/components/modal/CallModal";

export default function CreateArt() {
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
		<main className="min-h-[calc(100svh-4.25rem)] w-screen bg-dark">
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
				/>
			</div>
			<CallModal
				modalType="ShowAllArtModal"
				isOpen={modalIsOpen}
				onReqClose={toggleModal}
			/>
		</main>
	);
}
