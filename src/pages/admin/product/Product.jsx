// import React, { useState } from "react";
// import ProductForm from "./ProductForm";
// import ProductSearch from "./ProductSearch";
// import { FiPlus } from "react-icons/fi";
// import ProductTable from "./ProductTable";

import { Route, Routes } from "react-router";
import ProductHeader from "./ProductHeader";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
// import ProductTable from "./ProductTable";
// import ProductForm from "./ProductForm";

const Product = () => {
  // const [showForm, setShowForm] = useState(false);
  return (
    <>
      <ProductHeader />
      <Routes>
        <Route path="/" element={<ProductTable />} />
        <Route path="/add" element={<ProductForm />} />
        {/* <Route path="editproduct/:id/edit" element={<EditProduct />} /> */}
      </Routes>
    </>
  );
};

export default Product;
