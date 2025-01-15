import React from 'react';
import { useImageCache } from '../hooks/useImageCache';

interface CachedImageProps {
    src: string;
    alt: string;
    className?: string;
}

const CachedImage: React.FC<CachedImageProps> = ({ src, alt, className }) => {
    const cachedSrc = useImageCache(src);

    return (
        <img
            src={cachedSrc || src}
            alt={alt}
            className={className}
            onError={(e) => {
                console.error(`Failed to load image: ${src}`);
                e.currentTarget.src = '/path/to/fallback-image.jpg'; // Replace with your fallback image path
            }}
        />
    );
};

export default CachedImage;