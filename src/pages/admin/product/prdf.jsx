import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { postAddProduct } from "../../../api/apiServices";

const ProductForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    gender: "",
    weight: "",
    quantity: "",
    image: null,
    rating: "1",
    price: "",
    newPrice: "",
    trending: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    brand: "",
    category: "",
    gender: "",
    weight: "",
    quantity: "",
    image: "",
    price: "",
    trending: "",
  });

  const [errorPrice, setErrorPrice] = useState("");

  const [msg, setMsg] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  // const [message, setMessage] = useState("");
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    // Xử lý input file
    const fileValue = type === "file" ? files[0] : value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: fileValue,
    }));

    // Xóa thông báo lỗi khi người dùng bắt đầu nhập liệu
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const hanldePriceChange = (e) => {
    const inputPrice = parseInt(e.target.value, 10);
    setErrorPrice("");
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: inputPrice,
      newPrice: inputPrice - 21000,
    }));
  };
  //postAddProduct;
  const handleAdd = async (data) => {
    try {
      const addP = await postAddProduct(data);
      console.log("addresserere addresserere", addP);
    } catch (error) {
      console.error("Error during API request:", error);
      if (error.response) {
        // Request was made and server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received");
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(product).forEach((key) => {
      if (!product[key]) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    if (Object.keys(newErrors).length > 0 || product.price < 0) {
      // Nếu có lỗi, hiển thị thông báo lỗi và không thực hiện submit
      setErrors(newErrors);
      setErrorPrice("Giá không thể nhỏ hơn 0");
    } else {
      // Nếu không có lỗi, thực hiện các xử lý khác ở đây

      setMsg("Uploading...");
      setProgress((prevState) => {
        return { ...prevState, started: true };
      });
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("brand", product.brand);
      formData.append("category", product.category);
      formData.append("gender", product.gender);
      formData.append("weight", product.weight);
      formData.append("quantity", product.quantity);
      formData.append("image", selectedFile);
      formData.append("rating", product.rating);
      formData.append("price", product.price);
      formData.append("newPrice", product.newPrice);
      formData.append("trending", product.trending);

      console.log("Product test form: ", product);
      handleAdd(product);
    }
  };

  return (
    <div className="bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm</h2>
      <div className="flex gap-4">
        <div>
          <div className="flex flex-col w-56">
            <div className="text-sm font-medium text-gray-700 p-2">
              Tên sản phẩm
            </div>
            <input
              type="text"
              name="name"
              className="p-2 border rounded-md "
              value={product.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <div className="text-red-300 text-xs p-2">{errors.name}</div>
            )}
          </div>
          <div className="flex flex-col w-56">
            <div className="text-sm font-medium text-gray-700 p-2">
              Thương hiệu
            </div>
            <input
              type="text"
              name="brand"
              className="p-2 border rounded-md"
              value={product.brand}
              onChange={handleInputChange}
            />
            {errors.brand && (
              <div className="text-red-300 text-xs p-2">{errors.brand}</div>
            )}
          </div>
          <div className="flex flex-col w-56">
            <div className="text-sm font-medium text-gray-700 p-2">Mô tả</div>
            <textarea
              name="description"
              className="p-2 border rounded-md max-h-[100px]"
              value={product.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <div className="flex flex-col w-56">
            <div className="text-sm font-medium text-gray-700 p-2">
              Loại kính
            </div>
            <select
              name="category"
              className="p-3 border rounded-md"
              value={product.category}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn loại kính --</option>
              <option value="Vision">Vision</option>
              <option value="Sports">Sports</option>
              <option value="Sunglasses">Sunglasses</option>
            </select>
            {errors.category && (
              <div className="text-red-300 text-xs p-2">{errors.category}</div>
            )}
          </div>
          <div className="flex flex-col w-56">
            <div className="text-sm font-medium text-gray-700 p-2">
              Giới tính
            </div>
            <select
              name="gender"
              className="p-3 border rounded-md"
              value={product.gender}
              onChange={handleInputChange}
            >
              <option value="">-- Chọn giới tính --</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
            </select>
            {errors.gender && (
              <div className="text-red-300 text-xs p-2">{errors.gender}</div>
            )}
          </div>
          <div className="flex flex-col w-56">
            <div className="text-sm font-medium text-gray-700 p-2">
              Khối lượng(g)
            </div>
            <input
              name="weight"
              className="p-2 border rounded-md"
              value={product.weight}
              onChange={handleInputChange}
            />
            {errors.weight && (
              <div className="text-red-300 text-xs p-2">{errors.weight}</div>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col w-61">
            <div className="flex flex-col w-61">
              <div className="text-sm font-medium text-gray-700 p-2">
                Hình ảnh
              </div>
              <input
                type="file"
                name="image"
                className="p-2 border rounded-md"
                onChange={handleInputChange}
              />
              {errors.image && (
                <div className="text-red-300 text-xs p-2">{errors.image}</div>
              )}
              {progress.started && (
                <progress max="100" value={progress.pc}></progress>
              )}
              {msg && <span>{msg}</span>}
            </div>
            <div className="grid grid-cols-2 gap-4 w-61">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-700 p-2">
                  Số lượng
                </div>
                <input
                  type="number"
                  min="0"
                  step="1"
                  name="quantity"
                  className="p-2 border rounded-md"
                  value={product.quantity}
                  onChange={handleInputChange}
                />
                {errors.quantity && (
                  <span className="text-red-300 text-xs p-2">
                    {errors.quantity}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-700 p-2">
                  Thịnh hành
                </div>
                <select
                  name="trending"
                  className="p-3 border rounded-md"
                  value={product.trending}
                  onChange={handleInputChange}
                >
                  <option value="">-- Chọn thịnh hành --</option>
                  <option value="1">Có</option>
                  <option value="0">Không</option>
                </select>
                {errors.trending && (
                  <div className="text-red-300 text-xs p-2">
                    {errors.trending}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 w-61">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-700 p-2">Giá</div>
                <input
                  type="number"
                  name="price"
                  className="p-2 border rounded-md"
                  value={product.price}
                  onChange={hanldePriceChange}
                />
                {errors.price && (
                  <div className="text-red-300 text-xs p-2">{errors.price}</div>
                )}
                {errorPrice && (
                  <div className="text-red-300 text-xs p-2">{errorPrice}</div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-medium text-gray-700 p-2">
                  Giá khuyến mãi
                </div>
                <input
                  type="number"
                  name="newPrice"
                  className="p-2 border rounded-md"
                  value={product.newPrice}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {/* <p className="text-warning">{message}</p> */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Thêm
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
