import { NavLink, Outlet } from "react-router-dom";

const ProductHeader = () => {
  return (
    <div>
      <nav className=" p-4 border-b-2 border-gray-50 shadow-md mb-5">
        <div className="flex items-center space-x-4 justify-between">
          <NavLink to="" className="text-black hover:text-gray-700 link">
            Danh sách sản phẩm
          </NavLink>
          <NavLink to="add" className="text-black hover:text-gray-700 link">
            + Thêm sản phẩm
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default ProductHeader;
