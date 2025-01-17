import React, { useState, useEffect } from "react";

interface ProgressiveImageProps {
    lowQualitySrc: string;
    highQualitySrc: string;
    alt: string;
    className?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
    lowQualitySrc,
    highQualitySrc,
    alt,
    className = "",
}) => {
    const [src, setSrc] = useState(lowQualitySrc);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = highQualitySrc;
        img.onload = () => {
            setSrc(highQualitySrc);
            setIsLoaded(true);
        };
    }, [highQualitySrc]);

    return (
        <img
            src={src}
            alt={alt}
            className={`transition-all duration-300 ${
                isLoaded ? "blur-0" : "blur-sm"
            } ${className}`}
            loading="lazy"
        />
    );
};

export default ProgressiveImage;
