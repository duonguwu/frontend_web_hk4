import { useProductsContext } from "../../contexts";
import TrendingCard from "./TrendingCard";

const TrendingList = () => {
  const { trendingProducts } = useProductsContext();
  return (
    <section className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3   lg:grid-cols-4 gap-4  py-2 mt-">
      <section>
        <h1 className="text-3xl md:text-4xl mt-1">
          Trào lưu
        </h1>
        <hr />
        <p className="py-1 text-md  text-gray-600">
        Phụ kiện không thể thiếu của bất kỳ bạn nào muốn biến bộ trang phục của mình trở nên cá tính...
        </p>
      </section>
        
      {trendingProducts.map((product) => (
        <TrendingCard key={product._id} product={product} />
      ))}
    </section>

  );
};

export default TrendingList;
