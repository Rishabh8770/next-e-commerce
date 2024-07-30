import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@nextui-org/react";

export type SortOptions =
  | "--please select--"
  | "Price : low to high"
  | "Price : high to low"
  | "name"
  | "Show All";

type SortProductProps = {
  onProductSort: (filter: SortOptions) => void;
};

export const ProductSort = ({ onProductSort }: SortProductProps) => {
  const [sortOption, setSortOption] =
    useState<SortOptions>("--please select--");

  const handleProductSort = (option: SortOptions) => {
    setSortOption(option);
    onProductSort(option);
  };

  return (
    <div className="my-4 flex flex-col items-center">
      <label htmlFor="filter" className="mr-2 h6 mb-2">
        Sort By
      </label>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            {sortOption !== "--please select--" ? sortOption : "Open Menu"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Sort Options"
          onAction={(key) => handleProductSort(key as SortOptions)}
        >
          <DropdownItem key="Show All">Show All</DropdownItem>
          <DropdownItem key="name">Name</DropdownItem>
          <DropdownItem key="Price : low to high">Price : low to high</DropdownItem>
          <DropdownItem key="Price : high to low">Price : high to low</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
