import React from "react";
import { useProductsContext } from "../../contexts";
import TrendingCard from "./TrendingCard";

const TrendingList = () => {
  const { trendingProducts } = useProductsContext();

  const [currentItems, setCurrentItems] = React.useState(7);
  const [totalItems, setTotalItems] = React.useState(trendingProducts.length);

  const handleShowMore = () => {
    setCurrentItems(currentItems + 8);
  };

  return (
    <section>
      <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2 ">
        <section>
          <h1 className="text-3xl md:text-4xl mt-1">
            Trào lưu
          </h1>
          <hr />
          <p className="py-1 text-md text-gray-600">
            Phụ kiện không thể thiếu của bất kỳ bạn nào muốn biến bộ trang phục của mình trở nên cá tính...
          </p>
        </section>

        {trendingProducts.slice(0, currentItems).map((product) => (
          <TrendingCard key={product._id} product={product} />
        ))}
      </section>
        <section className="flex justify-center items-center">
          {currentItems < totalItems && (
            <button
              onClick={handleShowMore}
              className="mt-3 px-3 py-1 shadow-sm rounded-md text-white bg-gray-600 text-sm hover:bg-gray-900 transition"
            >
              Hiển thị thêm
            </button>
          )}
        </section>
    </section>
    
  );
};

export default TrendingList;
