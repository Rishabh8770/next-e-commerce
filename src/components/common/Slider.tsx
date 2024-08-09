import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";

const ImageSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/product-listing");
  };

  return (
    <div className="w-full min-w-full mx-auto">
      <Slider {...settings}>
        <div
          className="relative"
          onClick={() => router.push("/category/fashion")}
        >
          <img
            src="/clothes.jpg"
            alt="Slide 1"
            className="w-full h-[600px] object-cover shadow-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40  flex-col space-y-1 text-center">
            <h2 className="text-white lg:text-4xl text-2xl font-bold">
              "Unleash Your Style: Discover the Latest Fashion Trends"
            </h2>
            <h3 className="text-white lg:text-2xl text-xl font-semibold">
              "Step into the season’s must-have styles, perfect for every
              occasion."
            </h3>
          </div>
        </div>
        <div className="relative">
          <img
            src="/mobiles.jpg"
            alt="Slide 2"
            className="w-full h-[600px] object-cover shadow-md"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40  space-y-1 text-center">
            <h2 className="text-white lg:text-4xl text-2xl font-bold">
              "Experience Innovation: The Future of Smartphones"
            </h2>
            <h3 className="text-white lg:text-2xl text-xl font-semibold">
              "Stay ahead with cutting-edge technology and unbeatable
              performance."
            </h3>
          </div>
        </div>
        <div className="relative">
          <img
            src="/beauty.jpg"
            alt="Slide 3"
            className="w-full h-[600px] object-cover shadow-md"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40  space-y-1 text-center">
            <h2 className="text-white lg:text-4xl text-2xl font-bold">
              "Glow Like Never Before: Elevate Your Beauty Routine"
            </h2>
            <h3 className="text-white lg:text-2xl text-xl font-semibold">
              "Discover the secrets to radiant skin and flawless beauty."
            </h3>
          </div>
        </div>
      </Slider>
      <div className="absolute inset-0 flex items-start justify-center pb-10 top-[32rem]">
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 rounded-lg border border-gray-100 text-white font-semibold  shadow-lg hover:bg-white hover:text-black transition duration-300"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
