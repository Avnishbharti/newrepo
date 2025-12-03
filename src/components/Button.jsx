import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "medium",      // small | medium | large
  icon: Icon,           // optional icon component
  iconSize,             // optional icon size override
  onClick,
  ...props
}) => {
  // Base button styles
  const base =
    "font-medium rounded-lg cursor-pointer flex items-center gap-2 transition-all duration-200 justify-center";

  // Variant styles
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200",
  };

  // Size styles
  const sizeStyles = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {Icon && <Icon size={iconSize || (size === "small" ? 14 : size === "large" ? 20 : 16)} />}
      {children}
    </button>
  );
};

export default Button;

