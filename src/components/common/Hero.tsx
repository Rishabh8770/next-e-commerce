"use client";

import React from "react";
import ImageSlider from "./Slider";
import ProductSlider from "./ProductSliders";

const Hero = () => {
  return (
    <div className="relative flex flex-col justify-center min-h-screen bg-gray-100">
      <ImageSlider />
      <div className="font-semibold text-center text-2xl mt-8">
        <h1>Explore Our Products</h1>
      </div>
      <ProductSlider />
      //*Commented out part can be used for welcome screen which contains an
      //*animated autoplay video with a button to : product-listing page to
      //*showcase products
      {/* <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/welcome.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 w-full h-full flex justify-end md:pr-40 pr-5 md:mt-0 mt-10">
        <div className="flex flex-col justify-center items-center bg-white lg:p-6 md:p-4 sm:p-2 rounded-lg  text-center w-1/3 h-full">
          <h1 className="lg:text-5xl md:text-3xl sm:text-sm font-bold lg:mb-10 mb-5 animate-bounce">Welcome to Shop-a-holic</h1>
          <button
            onClick={handleButtonClick}
            className="md:px-6 px-2 md:py-3 py-1 text-blue border border-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:text-white"
          >
            Take me to the Products
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
