import React from "react";
import "../../loader.styles.css";
import loadingGif from "../../assets/loading.gif";
const Loader = () => {
  return (
    <div className="text-loader font-monoton flex flex-col gap-1 items-center">
      <div className="text-container">
        <span className="letter">m</span>
        <span className="letter">a</span>
        <span className="letter">t</span>
        <span className="letter">v</span>
        <span className="letter">i</span>
        <span className="letter">e</span>
        <span className="letter">t</span>
      </div>
      <span>
        <img
          width={80}
          src={loadingGif}
          alt="loading..."
          className="opacity-[0.25]"
        />
      </span>
    </div>
  );
};

export default Loader;
