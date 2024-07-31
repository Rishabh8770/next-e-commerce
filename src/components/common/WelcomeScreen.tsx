"use client";

import React from "react";
import { useRouter } from "next/navigation";

const WelcomeScreen = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/product-listing");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/welcome.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 w-full h-full flex justify-end pr-40">
        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg  text-center w-1/3 h-full ">
          <h1 className="text-5xl font-bold mb-10 animate-bounce">Welcome to Shop-a-holic</h1>
          <button
            onClick={handleButtonClick}
            className="px-6 py-3 text-blue border border-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:text-white"
          >
            Take me to the Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
