"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { routePathNames } from "@/utils/pathUtils";

const Footer = () => {
  const pathName = usePathname();

  return (
    <div className={`${routePathNames.includes(pathName) && "hidden"}`}>
      <div className="footer-area bg-gray-800 text-white py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-3">
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <h4 className="footer-heading text-2xl">E-Commerce</h4>
              <div className="footer-underline h-px w-16 bg-gray-300 my-2"></div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </p>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <h4 className="footer-heading text-2xl">Quick Links</h4>
              <div className="footer-underline h-px w-16 bg-gray-300 my-2"></div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  Home
                </a>
              </div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  About Us
                </a>
              </div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  Contact Us
                </a>
              </div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  Blogs
                </a>
              </div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  Sitemaps
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <h4 className="footer-heading text-2xl">Shop Now</h4>
              <div className="footer-underline h-px w-16 bg-gray-300 my-2"></div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  Collections
                </a>
              </div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  Trending Products
                </a>
              </div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  New Arrivals Products
                </a>
              </div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  Featured Products
                </a>
              </div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  Cart
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/4 px-3">
              <h4 className="footer-heading text-2xl">Reach Us</h4>
              <div className="footer-underline h-px w-16 bg-gray-300 my-2"></div>
              <div className="mb-2">
                <p>
                  <i className="fa fa-map-marker"></i> #444, some main road,
                  some area, some street, bangalore, india - 560077
                </p>
              </div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  <i className="fa fa-phone"></i> +91 888-XXX-XXXX
                </a>
              </div>
              <div className="mb-2">
                <a href="#" className="text-white">
                  <i className="fa fa-envelope"></i> shopaholic@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area bg-gray-900 py-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-3 items-center">
            <div className="w-full md:w-2/3 lg:px-3 px-6 mb-4 md:mb-0">
              <p className="text-white mb-0">
                {" "}
                &copy; 2024 - Shop-a-holic. All rights reserved.
              </p>
            </div>
            <div className="w-full md:w-1/3 px-3 text-right">
              <div className="social-media">
                Get Connected:
                <a href="#" className="mx-2 text-white">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#" className="mx-2 text-white">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#" className="mx-2 text-white">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="#" className="mx-2 text-white">
                  <i className="fa fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
