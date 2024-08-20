import PostImpressionism from "@/assets/carousel/1postimpressionism.svg";
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
	{
		name: "Post Impressionism",
		src: PostImpressionism,
		artist: "Vincent Van Gogh",
		desc: "Appearing in the late 19th century, Post-Impressionism was marked by its break away from its precursor, Impressionism. The approach seen with such artists as Van Gogh was towards stimulating one's emotions and personal understanding. Simultaneously, it underlined structure, shape, and vibrant color.",
		link: "https://artsandculture.google.com/entity/post-impressionism/m015xrq?hl=en",
	},
	{
		name: "Cubism",
		src: cubism,
		artist: "Pablo Picasso",
		desc: "Cubism is an art style that came into existence through the artworks of Pablo Picasso in the early twentieth century. Here, the objects are broken down into geometric shapes and displayed from multiple viewpoints simultaneously, which emphasizes the flatness of the canvas instead of creating depth.",
		link: "https://artsandculture.google.com/usergallery/QwICMfYR7PJpJg",
	},
	{
		name: "Symbolism",
		src: symbolism,
		artist: "Edvard Munch",
		desc: "Late in the 19th century, Symbolism developed as an art of emotions and ideas conveyed through symbols and images that suggested these emotions. Artists like Edvard Munch explored the subconscious, dreams, and spiritual realms. Rich colors and distorted forms often characterize Symbolism in enigmatic compositions.",
		link: "https://artsandculture.google.com/entity/symbolism/m011bwy9t",
	},
	{
		name: "Surrealism",
		src: surrealism,
		artist: "Salvador Dalí",
		desc: "Built upon the principles of the subconscious mind and an abhorrence of rationalism, it is that Surrealism evolved during the early 20th century. Drawing from the irrational and the dreamlike, led by the artist Salvador Dalí, surrealists pushed the limits of reality.",
		link: "https://artsandculture.google.com/entity/surrealism/m073_6?hl=en",
	},
	{
		name: "Pop Art",
		src: popArt,
		artist: "Andy Warhol",
		desc: "Pop art was utterly different from the concepts of previous revolutions in art during its birth in the middle of the 20th century. Here, artists such as Andy Warhol turned to mass culture and consumerism for inspiration—in everyday objects and images. Imminent features of Pop Art are bold colors, repetitive patterns, and mechanical techniques.",
		link: "https://artsandculture.google.com/entity/pop-art/m0q4mn?hl=en",
	},
	{
		name: "Ukiyo-e",
		src: ukiyoE,
		artist: "Katsushika Hokusai",
		desc: "Originating in 17th-century Japan, Ukiyo-e was a genre of popular art representative of the contemporary way of life, coming to existence to through artworks of Katsushika Hokusai. It focused mostly on such subjects as beautiful women, kabuki actors, and landscapes.",
		link: "https://artsandculture.google.com/entity/ukiyo-e/m0bwbv?hl=en",
	},
	{
		name: "Impressionism",
		src: impressionism,
		artist: "Claude Monet",
		desc: "It is an 1870s Parisian art movement that introduced a naturalistic style, focused mainly on the fugitive light effects realized on the subjects. Claude Monet was one of those impressionist artists who underlined only the optical aspect by using small strokes of vivid colors to capture the scenes of landscapes, portraits, and scenes in everyday life",
		link: "https://artsandculture.google.com/entity/impressionism/m03xj1",
	},
	{
		name: "Baroque",
		src: baroque,
		artist: "Abraham Genoels II",
		desc: "The Baroque style emerged late in the 16th century in Italy and is characterized by drama, theatricality, and emotional intensity. Dramatic lighting effects, rich color, and complex composition are some of the elements that artists such as Abraham Genoels II used to make works of great visual beauty and immersion.",
		link: "https://artsandculture.google.com/entity/baroque/m0194x ",
	},
	{
		name: "Modern India",
		src: modernIndia,
		artist: "Amrita Sher-Gil",
		desc: "It was born in the early years of the 20th century as a peppy response to the colonial influence. Modern Indian art merged traditional Indian aesthetics with Western artistic techniques. Artists like Amrita Sher-Gil led this movement in the expression of nationalism, spiritualism, and social issues. Much of the art used folk art motifs, luxuriant colors, and powerful lines.",
		link: "https://en.wikipedia.org/wiki/Modern_Indian_painting",
	},
	{
		name: "Abstractionism",
		src: abstractionism,
		artist: "Wassily Kandinsky",
		desc: "Abstractionism was a resultant outgrowth of an early 20th-century turn away from representational art, radicalized on non-objective forms and colors. It pursued the expressive and compositional possibilities of pure abstraction championed by Wassily Kandinsky. Geometric shapes, vivid colors, and expressiveness in lines were formed as the basic unit of their artwork.",
		link: " https://artsandculture.google.com/entity/abstract-expressionism/m012yb9?hl=en",
	},
	{
		name: "Retro Pop",
		src: retroPop,
		artist: "Hiroshi Nagai",
		desc: "As a counterculture movement born in the mid-20th century, Retro Pop embraced nostalgia and kitsch. Most of the time, inspiration from popular culture and advertising comes through in the use of bright colors and bold patterns with ironic imagery. This style challenges traditional art values through the celebration of mass consumerism and everyday objects.",
		link: "",
	},
];

export const imageByIndex = (index: number) => {
	return images[index % images.length];
};
