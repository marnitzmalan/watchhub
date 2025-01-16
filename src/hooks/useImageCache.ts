import { useState, useEffect } from "react";

const cacheImage = async (src: string) => {
    const response = await fetch(src);
    const blob = await response.blob();
    const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
    localStorage.setItem(src, base64 as string);
    return base64;
};

const getCachedImage = (src: string) => {
    return localStorage.getItem(src) || null;
};

export const useImageCache = (src: string) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    useEffect(() => {
        const loadImage = async () => {
            const cachedSrc = getCachedImage(src);
            if (cachedSrc) {
                setImageSrc(cachedSrc);
            } else {
                const newCachedSrc = await cacheImage(src);
                setImageSrc(newCachedSrc as string);
            }
        };

        loadImage();
    }, [src]);

    return imageSrc;
};
