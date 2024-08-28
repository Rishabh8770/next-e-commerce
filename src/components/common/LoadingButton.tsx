import React from "react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  isLoading: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const LoadingButton = ({ 
  onClick, 
  isLoading, 
  disabled, 
  children, 
  ...props 
}: LoadingButtonProps) => {
  return (
    <button
      className={`loadingButton w-full bg-black text-white py-2 rounded-lg transition-transform transform ${
        !disabled && "hover:scale-105"
      } flex items-center justify-center`}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{ height: '48px' }}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="spinner mr-2"></div>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
