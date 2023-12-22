import { Route, Routes } from "react-router";
import ProductHeader from "./ProductHeader";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
// import ProductTable from "./ProductTable";
// import ProductForm from "./ProductForm";
import useAdminRedirect from "../useAdminRedirect";
const Product = () => {
  useAdminRedirect();
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
