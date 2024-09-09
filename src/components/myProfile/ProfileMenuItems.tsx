"use client";

import {
  Heart,
  MapPin,
  Pencil,
  ScanEye,
  ScrollText,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Edit Profile",
        path: "/my-profile/editProfile",
        icon: <Pencil color="#f8f7f7" strokeWidth={1.5} />,
      },
      {
        title: "My Addresses",
        path: "/my-profile/addresses",
        icon: <MapPin color="#ffffff" />
      },
      {
        title: "My Reviews",
        path: "/my-profile/myReviews",
        icon: <ScanEye color="#ffffff" strokeWidth={1.25} />,
      },
      {
        title: "My Orders",
        path: "/my-profile/myOrders",
        icon: <ScrollText color="#ffffff" strokeWidth={1.25} />,
      },
      {
        title: "Wishlist",
        path: "/my-profile/myWishlist",
        icon: <Heart color="#ffffff" strokeWidth={1.25}/>,
      },
    ],
  },
];

const ProfileMenuItems = () => {
  const pathName = usePathname();
  const menuItemsClass =
    "px-8 py-4 flex space-x-2 font-semibold hover:bg-menu-hover-bg rounded-xl mt-4 lg:mx-0 mx-2 cursor-pointer text-white";
  const activeClass = "bg-menu-active-bg";

  return (
    <div className="lg:mb-0 mb-2">
      <ul>
        {menuItems.map((items) => (
          <li key={items.title}>
            <ul>
              {items.list.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className={`${menuItemsClass} ${
                      pathName === item.path ? activeClass : ""
                    }`}
                  >
                    {item.icon} <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenuItems;
