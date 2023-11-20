import React from "react";
import { useProductsContext } from "../../contexts";
import CategoryCard from "./CategoryCard";

const CategoryList = ({ catRef }) => {
  const { categoryList } = useProductsContext();

  // if (loading) {
  //   return (
  //     <div className="text-center my-5">
  //       <p>Loading categories...</p>
  //     </div>
  //   );
  // }

  return (
    <>
      <h1 className="text-3xl md:text-4xl break-words text-center mt-10">
        Loại sản phẩm
      </h1>
      <section
        className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 mt-1"
        ref={catRef}
      >
        {categoryList.map((categoryItem) => (
          <CategoryCard key={categoryItem._id} category={categoryItem} />
        ))}
      </section>
    </>
  );
};

export default CategoryList;
