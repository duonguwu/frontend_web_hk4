import React, { useState, useEffect } from "react";
import { useProductsContext } from "../../contexts";
import { useNavigate } from "react-router";
import axios from "axios";
const CategoryCard = ({
  category: { categoryName, description, categoryImg },
}) => {
  const navigate = useNavigate();
  const { applyFilters } = useProductsContext();
  const [showCategory, setShowCategory] = useState(true);
  const [categories, setCategories] = useState([]); // State để lưu danh mục

  // Sử dụng useEffect để tải danh mục từ API khi component được tạo
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories") // Đảm bảo URL endpoint đúng
      .then((response) => {
        // Lưu danh sách danh mục vào state
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh mục:", error);
      });
  }, []);

  const clickHandler = () => {
    console.log(categoryName);
    applyFilters("categories", [categoryName]);
    navigate("/products", { state: { from: "category" } });
  };

  return (
    <section
      className="flex flex-col items-center rounded-xl bg-black/[.06] cursor-pointer gap-3 relative overflow-hidden categoryContainer"
      onClick={clickHandler}
    >
      <img
        src={categoryImg}
        alt={categoryName}
        className="rounded-xl h-full w-full object-cover transition-all delay-75 ease-out"
      />
      <div className="flex flex-col w-full h-full justify-center items-center transition-all delay-75 absolute left-0 right-0 bottom-0 top-0 bg-black/[0.3] rounded-xl">
        <h1 className="text-4xl xs:text-6xl sm:text-8xl lg:text-6xl font-extrabold capitalize text-[--theme-color] shadow-sm p-3 break-all">
          {categoryName}
        </h1>
      </div>
    </section>
  );
};

export default CategoryCard;
