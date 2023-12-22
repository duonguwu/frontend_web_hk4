import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { PRODUCTS_URL } from "../../../api/apiUrls";
import { getAllProductsService } from "../../../api/apiServices";

import { useAuthContext } from "../../../contexts";

const titleProducts = [
  { title: "Tên sản phẩm" },
  { title: "Thương hiệu" },
  { title: "Loại kính" },
  { title: "Giới tính" },
  { title: "Khối lượng" },
  { title: "Hình ảnh" },
  { title: "Số lượng" },
  { title: "Giá" },
  { title: "Giá khuyến mãi" },
];

const ProductTable = () => {
  const { token } = useAuthContext();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [proProduct, setProProduct] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    (async () => {
      const getProduct = await getAllProductsService();
      setProducts(getProduct.data.products);
      //console.log("Products in state:", products);
    })();
  }, [token]);

  // const filteredProducts = products.filter((product) => {
  //   const matchesSearch = product[proProduct]
  //     .toLowerCase()
  //     .includes(search.toLowerCase());

  //   return matchesSearch;
  // });
  const filterProducts = () => {
    if (!proProduct && !search) {
      return products;
    }

    return products.filter((product) => {
      const productValue = product[proProduct];
      if (!productValue) return false;

      const matchesSearch = productValue
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesSearch;
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts().slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filterProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;

  const paginate = (pageNumber) => {
    console.log("Current Page:", pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex justify-end mb-4 gap-3">
        <select
          name="proProduct"
          className="p-3 border rounded-md"
          value={proProduct}
          onChange={(e) => setProProduct(e.target.value)}
        >
          <option value="">Chọn thuộc tính sản phẩm</option>
          <option value="name">Tên</option>
          <option value="brand">Thương hiệu</option>
          <option value="category">Loại kính</option>
          <option value="gender">Giới tính</option>
        </select>
        <input
          type="text"
          className="border-black p-1 "
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div className="overflow-x-auto shadow-lg overflow-y-scroll">
        <table className="min-w-full text-sm text-left text-gray-500 rounded-md">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky-header">
            <tr>
              {titleProducts.map((titleProduct, idx) => (
                <th
                  scope="col"
                  key={idx}
                  className={`py-2 text-center top-0 sticky`}
                >
                  {titleProduct.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={product._id}
              >
                <td align="center">{product.name}</td>

                <td align="center">{product.brand}</td>
                <td align="center">{product.category}</td>
                <td align="center">{product.gender}</td>
                <td align="center">{product.weight}</td>
                <td align="center">
                  <div className="h-20 w-36 overflow-hidden">
                    <img
                      src={product.image}
                      alt=""
                      className="object-cover h-full w-full"
                    />
                  </div>
                </td>
                <td align="center">{product.quantity}</td>
                <td align="center">
                  <span>
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product?.price)}
                  </span>
                </td>
                <td align="center">
                  <span>
                    {" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product?.newPrice)}
                  </span>
                </td>
                <td>
                  {/* <Link to={`/editproduct/${.id}/edit`} className="btn btn-success mx-2">
                      Edit
                    </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            className={`${
              isFirstPage ? "opacity-50 cursor-not-allowed" : "bg-gray-800"
            } text-white py-2 px-4 rounded-md focus:outline-none mr-2`}
            onClick={() => paginate(currentPage - 1)}
            disabled={isFirstPage}
          >
            Trang trước
          </button>
          <button
            className={`${
              isLastPage ? "opacity-50 cursor-not-allowed" : "bg-gray-800"
            } text-white py-2 px-4 rounded-md focus:outline-none`}
            onClick={() => paginate(currentPage + 1)}
            disabled={isLastPage}
          >
            Trang sau
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
