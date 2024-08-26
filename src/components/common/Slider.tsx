import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/navigation";

const ImageSlider = () => {
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

  const items = {
    list: [
      {
        image: "/clothes.jpg",
        title: "Unleash Your Style: Discover the Latest Fashion Trends",
        subTitle:
          "Step into the season’s must-have styles, perfect for every occasion.",
      },
      {
        image: "/mobiles.jpg",
        title: "Experience Innovation: The Future of Smartphones",
        subTitle:
          "Stay ahead with cutting-edge technology and unbeatable performance.",
      },
      {
        image: "/beauty.jpg",
        title: "Glow Like Never Before: Elevate Your Beauty Routine",
        subTitle: "Discover the secrets to radiant skin and flawless beauty.",
      },
    ],
  };

  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/product-listing");
  };

  return (
    <div className="w-full min-w-full mx-auto">
      <Slider {...settings}>
        {items.list.map((item) => (
          <div className="relative" key={item.title}>
            <img
              src={item.image}
              alt="Slide 1"
              className="w-full h-[600px] object-cover shadow-md"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40  flex-col space-y-1 text-center">
              <h2 className="text-white lg:text-4xl text-2xl font-bold">
                {item.title}
              </h2>
              <h3 className="text-white lg:text-2xl text-xl font-semibold">
                {item.subTitle}
              </h3>
            </div>
          </div>
        ))}
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
