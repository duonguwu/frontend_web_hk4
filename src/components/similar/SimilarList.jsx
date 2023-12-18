import { useProductsContext } from "../../contexts";
import SimilarCard from "./SimilarCard";
import React from "react";

const SimilarList = ({ currentProductCategory }) => {
  const { allProducts } = useProductsContext();

  const similarProducts = allProducts.filter(
    (product) => product.category === currentProductCategory
  );

  return (
    <section className="w-full">
      <hr className="w-full" />
      <br />
      <h1 className=" text-2xl sm:text-4xl font-bold">Có thể bạn thích</h1>
      <div className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3   lg:grid-cols-4 gap-4  py-4 mt-10">
        {similarProducts?.map((product) => (
          <SimilarCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default SimilarList;
