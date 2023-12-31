import { GiRoundStar } from "react-icons/gi";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";
import {
  useAuthContext,
  useCartContext,
  useProductsContext,
  useWishlistContext,
} from "../../contexts";
import { useLocation, useNavigate } from "react-router";
import { notify } from "../../utils/utils";

const SingleProduct = ({ product }) => {
  const { token } = useAuthContext();
  const { isInCart } = useProductsContext();
  const { addProductToCart, disableCart } = useCartContext();
  const { addProductToWishlist, deleteProductFromWishlist, disableWish } =
    useWishlistContext();
  const navigate = useNavigate();
  const location = useLocation();
  let inCart = isInCart(product._id);

  return (
    <div
      className="flex flex-col xs:flex-row sm:flex-col  bg-white/[0.5] rounded-lg shadow-md border-2 border-black/[0.05] overflow-hidden
      cursor-pointer
      transition-transform
      hover:scale-[1.02] hover:shadow-lg"
    >
      <div
        // className="flex items-center justify-center p-10 xs:p-5 sm:p-10 bg-black/[0.075] h-1/2 xs:h-full sm:h-1/2 xs:w-1/2 w-full sm:w-full"
        className="flex items-center justify-center p-10 xs:p-5 sm:p-10 bg-black/[0.075]  xs:w-1/2 w-full sm:w-full"
        onClick={() => {
          navigate(`/product/${product._id}`);
        }}
      >
        <img
          src={product.image}
          alt=""
          className="w-full object-cover xs:object-contain sm:object-cover h-28"
        />
      </div>

      <div className="p-3 flex flex-col justify-between gap-2 mt-2 h-1/2 xs:h-full sm:h-1/2 xs:w-2/3 w-full sm:w-full">
        <div>
          <div className=" flex justify-between">
            <div className="flex flex-col">
              <span className="text-xl font-medium">{product.name}</span>
              <span className="flex items-center gap-1">
                <span>{product.rating}</span>

                <GiRoundStar className=" text-yellow-400 mb-1" />
                <span className="text-xs text-gray-400">Rating</span>
              </span>
            </div>

            <div className="flex flex-col items-end">
              {/* <span className="text-red-800">{product.newPrice}VNĐ</span> */}
              <span className="text-red-800 ">
                {" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.newPrice)}
              </span>
              {/* <span className="text-sm text-gray-600 line-through">
                {product.price}VNĐ
              </span> */}
              <span className="text-gray-600 line-through text-sm">
                {" "}
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600">{product.brand}</p>
        </div>
        <div className="w-full pt-2 border-t flex justify-between items-center">
          <button
            className={`border border-[--primary-text-color]  py-1.5 text-sm  rounded-full px-6 hover:bg-[--primary-text-color] hover:text-white transition hover:shadow-md disabled:cursor-not-allowed`}
            disabled={disableCart}
            onClick={() => {
              if (!token) {
                navigate("/login", { state: { from: location.pathname } });
                notify("warn", "Đăng nhập để tiếp tục");
              } else {
                if (!inCart) {
                  addProductToCart(product);
                } else {
                  navigate("/cart");
                }
              }
            }}
          >
            {inCart ? "Đến giỏ hàng" : "Thêm vào giỏ hàng"}
          </button>
          <button
            disabled={disableWish}
            className="disabled:cursor-not-allowed"
            onClick={() => {
              if (!token) {
                navigate("/login", { state: { from: location.pathname } });
                notify("warn", "Đăng nhập để tiếp tục");
              } else {
                if (product?.inWish) {
                  deleteProductFromWishlist(product._id);
                } else {
                  addProductToWishlist(product);
                }
              }
            }}
          >
            {product.inWish ? (
              <BsFillBookmarkHeartFill className="text-xl text-red-600 hover:shadow-md transition" />
            ) : (
              <BsBookmarkHeart className="text-xl hover:text-red-600 hover:shadow-md transition" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
