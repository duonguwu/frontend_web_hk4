import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const ProductForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "",
    gender: "",
    weight: "",
    quantity: "",
    image: "",
    rating: "1",
    price: "",
    newPrice: "",
    trending: "",
  });

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
  const handleInputChange = async (e) => {
    const { name, value, type, files } = e.target;

    // Xử lý input file
    let fileValue = type === "file" ? files[0] : value;
    if (type === "file") {
      fileValue = await uploadImage(fileValue);
    }
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

  const uploadImage = async (files) => {
    const CLOUD_NAME = "dtldsdxbm";
    const PRESET_NAME = "demo_upload";
    const FOLDER_NAME = "matviet";
    let urls;
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", files);
    const response = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    urls = response.data.secure_url;
    return urls;
  };

  const hanldePriceChange = (e) => {
    const inputPrice = parseInt(e.target.value, 10);
    setErrorPrice("");
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: inputPrice,
      newPrice: (inputPrice * 70) / 100 - 1000,
    }));
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
      setErrors(newErrors);
      setErrorPrice("Giá không thể nhỏ hơn 0");
    } else {
      setMsg("Uploading...");
      setProgress((prevState) => {
        return { ...prevState, started: true };
      });

      const formData = new FormData();
      const id = uuidv4();
      formData.append("id", id);
      Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
      });

      axios
        .post("http://localhost:8000/api/admin/addproduct", formData, {
          onUploadProgress: (progressEvent) => {
            setProgress((prevState) => {
              return { ...prevState, pc: progressEvent.progress * 100 };
            });
          },
        })
        .then((response) => {
          setMsg("Upload successful");
          console.log("Response:", response);
          toast.success("Đã thêm sản phẩm");
        })
        .catch((error) => {
          setMsg("Upload fail");
          console.error("Error:", error);
          toast.error("Không thể thêm sản phẩm");
        });
    }
  };

  return (
    <div className="bg-white rounded-md">
      <h2 className="text-2xl font-bold mb-4">Thêm sản phẩm</h2>
      <form encType="multipart/form-data">
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
                <div className="text-red-300 text-xs p-2">
                  {errors.category}
                </div>
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
              <div className="text-sm font-medium text-gray-700 p-2">
                Hình ảnh
              </div>
              <input
                type="file"
                name="image"
                id="product-image"
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
      </form>

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
