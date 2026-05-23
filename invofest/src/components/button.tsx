interface ButtonProps {
    label: string;
    variant?: "primary" | "secondary";
    type?: "button" | "submit";
    onClick?: () => void;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    label,
    variant = "primary",
    type = "button",
    isLoading = false,
    onClick, 
}) => {
    const baseStyle = "px-4 py-2 rounded font-medium transition-all active:scale-95";
    const varianStyle = {
        primary: "bg-red-900 text-white hover:bg-red-800",
        secondary: "border border-red-900 text-red-900 hover:bg-red-50"
    };

    return (
        <button
            type={type}
            disabled={isLoading}
            onClick={onClick} 
            className={`${baseStyle} ${varianStyle[variant]} ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {isLoading ? "Loading..." : label}
        </button>
    );
};

export default Button;