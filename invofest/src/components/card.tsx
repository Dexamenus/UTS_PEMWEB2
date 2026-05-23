import React, { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white p-6 flex flex-col justify-between border border-gray-100 shadow-[6px_6px_0px_0px_#7a2543] ${className}`}
    >
      {children}
    </div>
  );
};