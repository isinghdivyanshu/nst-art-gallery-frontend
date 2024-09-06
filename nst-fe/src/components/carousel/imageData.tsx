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
		artist: {
			name: "Vincent Van Gogh",
			period: "1853-1890",
		},
		desc: "Post-impressionism helps express artists personally and experiment with colors and forms. By considering the emotional impact that artworks evoke on the viewer and not just the realistic portrayal, artists can create works that deeply resonate with those who view them.",
		link: "https://artsandculture.google.com/entity/post-impressionism/m015xrq?hl=en",
		art: {
			name: "The Starry Night",
			year: "1889",
		},
	},
	{
		name: "Cubism",
		src: cubism,
		artist: {
			name: "Pablo Picasso",
			period: "1881-1973",
		},
		desc: "Cubism influences your art by arranging elements unexpectedly by overlapping and interconnecting them. You can create dynamic, thought-provoking, and visually engaging works by incorporating Cubist elements into your art.",
		link: "https://artsandculture.google.com/usergallery/QwICMfYR7PJpJg",
		art: {
			name: "The Weeping Women",
			year: 1937,
		},
	},
	{
		name: "Symbolism",
		src: symbolism,
		artist: {
			name: "Edvard Munch",
			period: "1863-1944",
		},
		desc: "Symbolism is characterized by rich colors and distorted forms in enigmatic compositions. compositions. Symbolic elements in a painting create multiple dimensions and depth, making viewers look for numerous meanings.",
		link: "https://artsandculture.google.com/entity/symbolism/m011bwy9t",
		art: {
			name: "The Scream",
			year: "1893",
		},
	},
	{
		name: "Surrealism",
		src: surrealism,
		artist: {
			name: "Salvador Dalí",
			period: "1904-1989",
		},
		desc: "Surrealism inspires artists to tap into their subconscious and work on unconventional representations. They can create emotional and thought-provoking works when working with the illogical and the dream-like.",
		link: "https://artsandculture.google.com/entity/surrealism/m073_6?hl=en",
		art: {
			name: "The Persistence of Memory",
			year: "1931",
		},
	},
	{
		name: "Pop Art",
		src: popArt,
		artist: {
			name: "Andy Warhol",
			period: "1928-1987",
		},
		desc: "Pop Art inspires an artist through the contrasting relationship between traditional fine arts and popular culture. It involves the use of mass-produced imagery in bold aesthetics and provokes thoughts among their viewers.",
		link: "https://artsandculture.google.com/entity/pop-art/m0q4mn?hl=en",
		art: {
			name: "Marilyn Monroe 31 (FS II.31)",
			year: "1967",
		},
	},
	{
		name: "Ukiyo-e",
		src: ukiyoE,
		artist: {
			name: "Katsushika Hokusai",
			period: "1760-1849",
		},
		desc: "Ukiyo-e can also enforce in the work an emphasis on narrative and storytelling. It is possible to make paintings both beautiful and meaningful by using techniques of perspective, composition, and patterns elaborately.",
		link: "https://artsandculture.google.com/entity/ukiyo-e/m0bwbv?hl=en",
		art: {
			name: "The Great Wave off Kanagawa",
			year: "1831",
		},
	},
	{
		name: "Impressionism",
		src: impressionism,
		artist: {
			name: "Claude Monet",
			period: "1840-1926",
		},
		desc: "Impressionism involves the use of small strokes of vivid colors to capture the scenes of landscapes, portraits, and scenes in everyday life. It can trigger a concentration in the artist on light and color interplay.",
		link: "https://artsandculture.google.com/entity/impressionism/m03xj1",
		art: {
			name: "Parc Monceau",
			year: "1878",
		},
	},
	{
		name: "Baroque",
		src: baroque,
		artist: {
			name: "Abraham Genoels II",
			period: "1640-1723",
		},
		desc: "Baroque art can influence artists to make works with a strong sense of drama and emotion. Dramatic lighting, vivid colors, and minute details all help artists create visually arresting paintings that engage the viewer.",
		link: "https://artsandculture.google.com/entity/baroque/m0194x ",
		art: {
			name: "Arcadian Landscape with a Mausoleum",
			year: "1684",
		},
	},
	{
		name: "Modern India",
		src: modernIndia,
		artist: {
			name: "Amrita Sher-Gil",
			period: "1913-1941",
		},
		desc: "Modern Indian style is a blend of traditional and modern techniques. One can infuse extra depth and cultural dimension into a painting using Indian art elements, from intricate patterns to vibrant colors and symbolic imagery.",
		link: "https://en.wikipedia.org/wiki/Modern_Indian_painting",
		art: {
			name: "Brahmacharis",
			year: "1937",
		},
	},
	{
		name: "Abstractionism",
		src: abstractionism,
		artist: {
			name: "Wassily Kandinsky",
			period: "1866-1944",
		},
		desc: "Abstractionism has geometric shapes, vivid colors, and expressiveness in lines as basic units of its presentation. A painting can bring forth depth, complexity, and a sense of visual dynamism using abstract elements.",
		link: " https://artsandculture.google.com/entity/abstract-expressionism/m012yb9?hl=en",
		art: {
			name: "Composition VII",
			year: "1913",
		},
	},
	{
		name: "Retro Pop",
		src: retroPop,
		artist: {
			name: "Hiroshi Nagai",
			period: "1947-present",
		},
		desc: "Retro Pop brings an energy that works on the betterment of the artwork with vividly applied colors and bold juxtapositions, often evoking visual astonishment and interest in the composition.",
		link: "https://www.tokyocowboy.co/articles/uy1r8j003qdvb4ozr4qgplhd3yujyn",
		art: {
			name: "Time Goes By",
			year: "2009",
		},
	},
];

export const imageByIndex = (index: number) => {
	return images[index % images.length];
};
