import { useState, useEffect, useContext, createContext } from 'react';
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


    useEffect(() => {
        if (gallery != null) {
            router.push('/gallery')
        }
    }, [gallery])

    const directGalleryPage = (galleryCode) => {
        setGallery(galleryCode);
        if (galleryCode) {
            router.push('/gallery')
        }
    }

    return {gallery, setGallery, directGalleryPage};



}