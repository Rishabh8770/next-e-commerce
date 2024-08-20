"use client";

import { LayoutDashboard, Plus, ShoppingBag, Users } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard color="#ffffff" />,
      },
      {
        title: "Products",
        path: "/admin/dashboard/products",
        icon: <ShoppingBag color="#f8f7f7" strokeWidth={1.5} />,
      },
      {
        title: "Add Products",
        path: "/admin/addProduct",
        icon: <Plus color="#ffffff" strokeWidth={1.25} />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <Users color="#ffffff" />,
      },
    ],
  },
];

const MenuItems = () => {
  const pathName = usePathname();
  const menuItemsClass =
    "px-8 py-4 flex space-x-2 font-semibold hover:bg-menu-hover-bg rounded-xl mt-4 cursor-pointer";
  const activeClass = "bg-menu-active-bg";

  return (
    <div>
      <ul>
        {menuItems.map((items) => (
          <li key={items.title}>
            <span>{items.title}</span>
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

export default MenuItems;
