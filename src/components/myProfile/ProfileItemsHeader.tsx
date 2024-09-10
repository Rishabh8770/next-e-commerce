import React from "react";

type ProfileHeaderProps = {
    title: string
}

const ProfileItemsHeader = ({title}: ProfileHeaderProps) => {
  return (
    <div className="lg:border-l-1 bg-side-sidebar-bg w-full">
      <div className="p-8">
        <h1 className="text-white text-2xl font-semibold">{title}</h1>
      </div>
    </div>
  );
};

export default ProfileItemsHeader;
