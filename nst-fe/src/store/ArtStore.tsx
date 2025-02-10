import {create} from 'zustand';

interface ArtStore{
    stylizedImage: File | null;
    setStylizedImage: (image: File) => void;
    clearStylizedImage: () => void;
}

export const useArtStore = create<ArtStore>((set) => ({
    stylizedImage: null,
    setStylizedImage: (image) => set({stylizedImage: image}),
    clearStylizedImage: () => set({stylizedImage: null})
}));