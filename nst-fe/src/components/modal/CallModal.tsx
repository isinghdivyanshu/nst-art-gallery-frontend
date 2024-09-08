import Modal from "react-modal";
import { ChevronLeft } from "lucide-react";
import ThemeCard from "../ThemeCard";
import placeholder from "../../../pictures/palceholder.jpg";

interface CallModalProps {
	modalType?: string;
	isOpen: boolean;
	onReqClose: () => void;
}

export default function CallModal({
	modalType,
	isOpen,
	onReqClose,
}: CallModalProps) {
	const closeTimeoutMS = 500;
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			backgroundColor: "#161516",
			width: "80%",
			height: "80%",
			border: "1px solid #EAD0B3",
			paddingTop: "60px",
			paddingInline: "40px",
		},
		overlay: {
			backgroundColor: "transparent",
			backdropFilter: "blur(10px)",
		},
	};

	if (modalType == "ShowAllArtModal") {
		return (
			<ShowAllArtModal
				isOpen={isOpen}
				onReqClose={onReqClose}
				style={customStyles}
				closeTimeoutMS={closeTimeoutMS}
			/>
		);
	}
}

interface ModalProps {
	isOpen: boolean;
	onReqClose: () => void;
	style: object;
	closeTimeoutMS: number;
}

function ShowAllArtModal({
	isOpen,
	onReqClose,
	style,
	closeTimeoutMS,
}: ModalProps) {
	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onReqClose}
			style={style}
			closeTimeoutMS={closeTimeoutMS}
		>
			<ChevronLeft
				onClick={onReqClose}
				size={40}
				className="absolute top-16 left-10 cursor-pointer text-light"
			/>
			<h1 className="text-3xl text-skin text-center">Art Styles</h1>
			<section className="flex flex-wrap gap-5 justify-center mt-10">
				<ThemeCard
					src={placeholder}
					alt="Placeholder"
					name="Abstract"
					containerClassName="hover:scale-105 cursor-pointer"
					imageClassName="w-60"
				/>
				<ThemeCard
					src={placeholder}
					alt="Placeholder"
					name="Abstract"
					containerClassName="hover:scale-105 cursor-pointer"
					imageClassName="w-60"
				/>
				<ThemeCard
					src={placeholder}
					alt="Placeholder"
					name="Abstract"
					containerClassName="hover:scale-105 cursor-pointer"
					imageClassName="w-60"
				/>
				<ThemeCard
					src={placeholder}
					alt="Placeholder"
					name="Abstract"
					containerClassName="hover:scale-105 cursor-pointer"
					imageClassName="w-60"
				/>
				<ThemeCard
					src={placeholder}
					alt="Placeholder"
					name="Abstract"
					containerClassName="hover:scale-105 cursor-pointer"
					imageClassName="w-60"
				/>
			</section>
		</Modal>
	);
}
