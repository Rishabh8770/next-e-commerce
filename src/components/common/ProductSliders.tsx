import React from 'react';
import Slider from 'react-slick';
import { useProductContext } from '@/context/ProductContext';
import ProductCard from '@/components/Products/ProductCard';

const ProductSlider = () => {
  const { products } = useProductContext();

  const settings = {
    dots: false,
    infinite: true,
    speed: 6000, 
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          speed: 3000
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          speed: 1000,
          autoplaySpeed: 3000
        },
      },
    ],
  };

  return (
    <div className="my-8">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <ProductCard {...product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
