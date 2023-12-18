import { Link } from "react-router-dom";

const SimilarCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="flex flex-col    px-4 py-2 rounded-xl  bg-gray-200 cursor-pointer gap-3 "
    >
      <div className="flex justify-between gap-3 xs:flex-wrap xs:justify-center sm:flex-nowrap sm:justify-between">
        <div>
          <h1 className="text-xl xs:text-base sm:text-xl font-bold">
            {product.name}
          </h1>
        </div>
        <div className="flex flex-col items-start ">
          <div className="flex items-center justify-between">
            <span className="text-red-800 ">
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.newPrice)}
            </span>
          </div>
          <p className="text-gray-600 text-sm text-end">{product.category}</p>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-20 xs:w-28 xs:h-16 sm:w-32 sm:h-20 py-2 object-cover hover:scale-110 transition"
        />
      </div>
    </Link>
  );
};

export default SimilarCard;
