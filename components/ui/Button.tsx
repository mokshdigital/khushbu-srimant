import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-3 px-6 rounded-xl font-semibold transition-all duration-200 active:scale-95 shadow-md";
  
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1",
    secondary: "bg-teal-500 text-white hover:bg-teal-600 border-b-4 border-teal-700 active:border-b-0 active:translate-y-1",
    outline: "bg-white text-orange-600 border-2 border-orange-500 hover:bg-orange-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};