import React from "react";

type ButtonVariant =
    | "primary"
    | "secondary"
    | "ghostSecondary"
    | "link"
    | "text"
    | "textDark"
    | "gradient";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    variant?: ButtonVariant;
}

const AppButton: React.FC<AppButtonProps> = ({
    children,
    icon,
    variant = "",
    className = "",
    disabled = false,
    ...props
}) => {
    const baseClasses =
        "px-3 py-2 rounded-md transition duration-300 ease-in-out inline-flex items-center justify-center";

    const variantClasses: Record<ButtonVariant, string> = {
        primary: "bg-purple-600 hover:bg-purple-700 text-white",
        secondary:
            "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200",
        // ghostSecondary:
        //     "bg-gray-200 hover:bg-gray-300 text-gray-800\n" +
        //     "dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200\n" +
        //     "md:bg-transparent md:hover:bg-white md:hover:bg-opacity-20 md:text-white\n" +
        //     "dark:md:bg-transparent dark:md:hover:bg-white dark:md:hover:bg-opacity-20 dark:md:text-white",
        ghostSecondary: "bg-transparent text-white hover:bg-gray-300 rounded-full",
        link: "bg-transparent text-blue-500 hover:underline dark:text-blue-400",
        text: "bg-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
        textDark:
            "bg-transparent text-white hover:bg-white/10 transition-colors duration-200 ease-in-out",
        gradient:
            "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white",
    };

    const selectedVariantClasses = variantClasses[variant];
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

    const combinedClasses =
        `${baseClasses} ${selectedVariantClasses} ${disabledClasses} ${className}`.trim();

    return (
        <button className={combinedClasses} disabled={disabled} {...props}>
            {icon && <span className="">{icon}</span>}
            {children}
        </button>
    );
};

export default AppButton;
