import React, { useState, useEffect } from "react";

interface LazyImageProps {
    src: string;
    placeholderSrc: string;
    alt: string;
    className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, placeholderSrc, alt, className }) => {
    const [imageSrc, setImageSrc] = useState(placeholderSrc);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImageSrc(src);
        };
    }, [src]);

    return <img src={imageSrc} alt={alt} className={className} />;
};

export default LazyImage;
