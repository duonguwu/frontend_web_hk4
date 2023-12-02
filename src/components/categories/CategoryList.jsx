import React from "react";
import { useProductsContext } from "../../contexts";
import CategoryCard from "./CategoryCard";

import handleRightImg from "../../assets/ico-next.ico";
import handleLeftImg from "../../assets/ico-previous.ico";

const CategoryList = ({ catRef }) => {
  const { categoryList } = useProductsContext();
  const [visibleImageIndices, setVisibleImageIndices] = React.useState([0, 1]);

  const handleNextImage = () => {
    const nextIndex = (visibleImageIndices[1] + 1) % categoryList.length;

    if (nextIndex === visibleImageIndices[1] + 1) {
      setVisibleImageIndices([visibleImageIndices[1], nextIndex]);
    }
    
  };

  const handlePreviousImage = () => {
    const prevIndex = (visibleImageIndices[0] - 1 + categoryList.length) % categoryList.length;
  
    if (prevIndex >= 0 && prevIndex < visibleImageIndices[0]) {
      setVisibleImageIndices([prevIndex, visibleImageIndices[0]]);
    }
  };
  

  const visibleCategories = categoryList.slice(visibleImageIndices[0], visibleImageIndices[1] + 1);

  return (
    <>
      <h1 className="text-3xl md:text-4xl break-words text-center mt-10">
        Loại sản phẩm
      </h1>
      <section className="w-full flex flex-inline relative">
        <section
          className="w-85 grid grid-cols-2 md:grid-cols-2 gap-4 py-4 mt-1 "
          ref={catRef}
        >
          {visibleCategories.map((categoryItem) => (
            <CategoryCard key={categoryItem._id} category={categoryItem} />
          ))}
        </section>
        {visibleImageIndices[0] !== 0 && (
          <button
            onClick={handlePreviousImage}
            className="bg-white/[0.7] pr-1 w-7 h-7 m-2 absolute left-0 top-1/2 -translate-y-1/2 rounded-full"
          >
            <img src={handleLeftImg} alt="" />
          </button>
        )}

        {visibleImageIndices[1] !== categoryList.length - 1 && (
          <button
            onClick={handleNextImage}
            className="bg-white/[0.7] w-7 h-7 m-2  pl-1 absolute right-0 top-1/2 -translate-y-1/2 rounded-full"
          >
            <img src={handleRightImg} alt="" />
  </button>
)}

      </section>
    </>
  );
};

export default CategoryList;
