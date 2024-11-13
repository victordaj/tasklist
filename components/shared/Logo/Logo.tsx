import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={
        "flex items-center justify-center h-8 w-8 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-lg shadow-lg" +
        className
      }
    >
      <div className="text-white text-3xl font-bold relative">
        <span
          className="inset-0 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200"
          style={{
            WebkitTextStroke: "1px #00000033",
          }}
        >
          T
        </span>
      </div>
    </div>
  );
};

export default Logo;
