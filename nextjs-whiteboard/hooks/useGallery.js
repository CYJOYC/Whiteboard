import { useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';

const galleryContext = createContext({ gallery: {}});
const { Provider } = galleryContext;

export function GalleryProvider(props) {
    const gallery = useGalleryProvider();
    return <Provider value={gallery}>{props.children}</Provider>;
}

export const useGallery = () => {
	return useContext(galleryContext);
};

const useGalleryProvider = () => {
    const [gallery, setGallery] = useState(null);
    const router = useRouter();
    return {gallery, setGallery};
}