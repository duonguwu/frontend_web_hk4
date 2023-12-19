import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const titleProducts = [
  { title: "Tên sản phẩm" },
  { title: "Mô tả" },
  { title: "Thương hiệu" },
  { title: "Loại kính" },
  { title: "Giới tính" },
  { title: "Khối lượng" },
  { title: "Hình ảnh" },
  { title: "Số lượng" },
  { title: "Giá" },
  { title: "Giá khuyến mãi" },
  { title: "Thịnh hành" },
  { title: "Chức năng" },
];

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [proProduct, setProProduct] = useState("");
  useEffect(() => {
    const getProduct = () => {
      fetch("http://127.0.0.1:8000/api/products")
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          console.log(response.products);
          setProducts(response.products);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getProduct();
  }, []);

  const filteredProducts = products.filter((product) => {

    const matchesSearch = product[proProduct].toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
    <>
      <div className="flex justify-end mb-4 gap-3">
        <select
          name="proProduct"
          className="p-3 border rounded-md"
          value={proProduct}
          onChange={(e) => setProProduct(e.target.value)}>
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
                <th scope="col" key={idx} className={`py-2 text-center top-0 sticky`}>
                  {titleProduct.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr className="bg-white border-b hover:bg-gray-50" key={product._id}>
                <td align="center">{product.name}</td>
                <td align="center">{product.description}</td>
                <td align="center">{product.brand}</td>
                <td align="center">{product.category}</td>
                <td align="center">{product.gender}</td>
                <td align="center">{product.weight}</td>
                <td align="center">
                  <img src={product.image} alt="" height={50} width={90} />
                </td>
                <td align="center">{product.quantity}</td>
                <td align="center">{product.price}</td>
                <td align="center">{product.newPrice}</td>
                <td align="center">{product.trending}</td>
                <td>
                  {/* <Link to={`/editproduct/${.id}/edit`} className="btn btn-success mx-2">
                      Edit
                    </Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;
