import React from "react";
import { MdClose } from "react-icons/md";

interface TrailerModalProps {
    trailerKey: string;
    onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ trailerKey, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl mx-4">
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white hover:text-gray-300"
                    aria-label="Close trailer"
                >
                    <MdClose size={24} />
                </button>
                <div className="relative pt-[56.25%]">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title="Movie Trailer"
                        className="absolute top-0 left-0 w-full h-full"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default TrailerModal;
