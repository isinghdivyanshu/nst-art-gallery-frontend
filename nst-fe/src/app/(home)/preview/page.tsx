"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { publishArt, saveArt } from "@/services/service";
import { useArtStore } from "@/store/ArtStore";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import v1 from "../../../../pictures/v1.svg";
import v2 from "../../../../pictures/v2.svg";
import v3 from "../../../../pictures/v3.svg";

const PREDEFINED_THEMES = [
    "Retro Pop",
    "Pop Art",
    "Surrealism",
    "Impressionism",
    "Cubism",
    "Post Impression"
] as const;
export default function Preview() {
    const router = useRouter();
    const [artName, setArtName] = useState("");
    const [artTheme, setArtTheme] = useState("");
    const [artDescription, setArtDescription] = useState("");
    const stylizedImage = useArtStore((state) => state.stylizedImage);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [artSlug, setArtSlug] = useState<string | null>(null);


    useEffect(() => {
        if (!stylizedImage) {
            router.push("/create");
        }
    }, [stylizedImage, router]);
    if (!stylizedImage) {
        return
    }
    const handleDownload = async () => {
        try {
            const response = await fetch(URL.createObjectURL(stylizedImage));
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${artName || 'stylized-art'}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("Failed to download image");
        }
    };

    const handleShare = async () => {
        try {
            const response = await fetch(URL.createObjectURL(stylizedImage));
            const blob = await response.blob();
            const file = new File([blob], `${artName || 'stylized-art'}.jpg`, { type: 'image/jpeg' });

            if (navigator.share) {
                await navigator.share({
                    files: [file],
                    title: artName || 'Stylized Art',
                });
            } else {
                toast.error("Sharing not supported on this device");
            }
        } catch (error) {
            toast.error("Failed to share image");
        }
    };

    const handlePublish = async () => {
        if (!artSlug) {
            toast.error("Please save the art first");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to publish art");
            return;
        }

        try {
            const response = await publishArt(token, artSlug);
            if (response?.status === "success") {
                toast.success("Art published successfully!");
            } else {
                toast.error(response?.message || "Failed to publish art");
            }
        } catch (error) {
            console.error("Error publishing art:", error);
            toast.error("Failed to publish art");
        }
    };

    const saveArtName = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to save art");
            return;
        }

        if (!artName || !artTheme || !artDescription) {
            toast.error("Please fill all fields");
            return;
        }
        setIsPending(true);
        try {
            // Convert File to base64
            const image = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result as string;
                    resolve(base64String.split(',')[1]);
                };
                reader.readAsDataURL(stylizedImage);
            });

            const response = await saveArt({
                token,
                theme: artTheme,
                image,
                title: artName,
                description: artDescription
            });

            if (response?.status === "success") {
                setArtSlug(response?.response.art.slug);
                toast.success("Art saved successfully!");
                // router.push("/account");
            } else {
                toast.error(response?.message || "Failed to save art");
            }
        } catch (error) {
            console.error("Error saving art:", error);
            toast.error("Failed to save art");
        } finally {
            setIsPending(false);
        }
    };


    return (
        <main className="min-h-[calc(100svh-4.25rem)] w-full bg-[url('../assets/hero/heroBg.svg')] bg-cover bg-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
                <section className="flex flex-col lg:flex-row gap-10 xl:gap-20">
                    <article className="flex flex-col justify-center lg:items-start w-2/3 gap-8">
                        <div className="border border-soil flex justify-center items-center overflow-hidden p-2">
                            <div className="relative w-full h-full">
                                <Image
                                    src={URL.createObjectURL(new Blob([stylizedImage]))}
                                    alt="Stylized Art"
                                    width={0}
                                    height={0}
                                    className="object-contain w-full h-auto"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            <label htmlFor="artName" className="text-light text-2xl font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                value={artName}
                                onChange={(e) => setArtName(e.target.value)}
                                placeholder="Enter art name..."
                                className="bg-mix text-light p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-soil"
                            />
                            <div className="w-full flex flex-col gap-6">
                                <label htmlFor="artTheme" className="text-light text-2xl font-medium">
                                    Theme
                                </label>
                                <select
                                    id="artTheme"
                                    value={artTheme}
                                    onChange={(e) => setArtTheme(e.target.value)}
                                    className="bg-mix text-light p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-soil appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>Select a theme...</option>
                                    {PREDEFINED_THEMES.map((theme) => (
                                        <option key={theme} value={theme} className="bg-dark">
                                            {theme}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="artDescription" className="text-light text-2xl font-medium">
                                    Description
                                </label>
                                <textarea
                                    id="artDescription"
                                    value={artDescription}
                                    onChange={(e) => setArtDescription(e.target.value)}
                                    placeholder="Enter art description..."
                                    rows={4}
                                    className="bg-mix text-light p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-soil resize-none"
                                />
                            </div>
                            <div className="relative group">
                                <Button
                                    type="button"
                                    text={isPending ? "Saving..." : "Save"}
                                    onClick={saveArtName}
                                    disabled={isPending || !artName || !artTheme || !artDescription}
                                    className="font-medium text-light bg-soil px-14 w-full"
                                />
                                <QuestionMarkCircleIcon className="w-5 h-5 text-dark absolute right-3 top-1/2 -translate-y-1/2" />
                                <div className="absolute invisible group-hover:visible border border-soil bg-dark text-soil p-2 rounded-md text-sm top-14 right-0 whitespace-nowrap">
                                    Save your art in your private collection
                                </div>
                            </div>
                        </div>
                    </article>

                    <article className="flex flex-col justify-start lg:items-start gap-6">
                        <Button
                            type="button"
                            text="Download"
                            onClick={handleDownload}
                            className="font-medium text-light bg-soil px-14 w-full h-12"
                        />
                        <Button
                            type="button"
                            text="Share"
                            onClick={handleShare}
                            className="font-medium text-dark bg-light px-14 w-full h-12"
                        />
                        <div className="relative group">
                            <Button
                                type="button"
                                text="Publish"
                                onClick={handlePublish}
                                disabled={!artSlug}
                                className="font-medium text-dark bg-skin w-80 px-14 h-12"
                            />
                            <QuestionMarkCircleIcon className="w-5 h-5 text-dark absolute right-3 top-1/2 -translate-y-1/2" />
                            <div className="absolute invisible group-hover:visible border border-soil bg-dark text-soil p-2 rounded-md text-sm top-14 right-0 whitespace-nowrap">
                                Publish your art in our art gallery and have it showcased!
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </main>
    );
};