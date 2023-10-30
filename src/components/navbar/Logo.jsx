import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="font-monoton text-3xl hover:text-blue-900 cursor-pointer text-center transition">
        matviet
      </div>
    </Link>
  );
};

export default Logo;
