import postImpressionism from "@/assets/carousel/1postimpressionism.svg";
import cubism from "@/assets/carousel/2cubism.svg";
import symbolism from "@/assets/carousel/3symbolism.svg";
import surrealism from "@/assets/carousel/4surrealism.svg";
import popArt from "@/assets/carousel/5popart.svg";
import ukiyoE from "@/assets/carousel/6ukiyoe.svg";
import impressionism from "@/assets/carousel/7impressionism.svg";
import baroque from "@/assets/carousel/8baroque.svg";
import modernIndia from "@/assets/carousel/9modernindia.svg";
import abstractionism from "@/assets/carousel/10abstractionism.svg";
import retroPop from "@/assets/carousel/11retropop.svg";

export const images = [
	postImpressionism,
	cubism,
	symbolism,
	surrealism,
	popArt,
	ukiyoE,
	impressionism,
	baroque,
	modernIndia,
	abstractionism,
	retroPop,
];

export const imageByIndex = (index: number) => {
	return images[index % images.length];
};
