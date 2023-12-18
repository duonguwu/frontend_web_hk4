// ProfileLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";

const ProfileLayout = ({ children }) => {
  return (
    <div className="px-[4%] md:px-[10%] pb-2 grid grid-cols-[1fr,2fr]">
      <div>
        <Navbar />
      </div>
      <div className="pt-32 sm:pt-20">{children}</div>
    </div>
  );
};

export default ProfileLayout;
