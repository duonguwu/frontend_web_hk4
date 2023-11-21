import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { Logo } from "../components";

const AdminLayout = () => {
  const menus = [
    { name: "SẢN PHẨM", link: "/admin_product", icon: MdOutlineDashboard },
    { name: "KHÁCH HÀNG", link: "/admin_customer", icon: AiOutlineUser },
    { name: "HÓA ĐƠN", link: "/admin_invoice  ", icon: FiShoppingCart },
    { name: "THỐNG KÊ", link: "/admin_dashboard", icon: TbReportAnalytics },
  ];
  const [activeLink, setActiveLink] = useState(null);
  const handleLinkClick = (link) => {
    setActiveLink(link);
    localStorage.setItem('activeLink', link);
  };
  useEffect(() => {
    // Lấy trạng thái từ localStorage khi trang được load lại
    const storedActiveLink = localStorage.getItem('activeLink');
    setActiveLink(storedActiveLink);
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="h-[3rem] px-[100px] box-border border-b-2 sticky top-0 flex justify-between items-center w-full z-50 shadow-inner backdrop-blur-sm backdrop-saturate-100">
        <Logo />
        <h1>Admin Panel</h1>
      </nav>
      <div className="box-border flex px-[100px] gap-[10px]">
        {/* Sidebar */}
        <aside className="w-[20%] h-[90vh] flex flex-col top-[3rem] border-r-2 sticky gap-2 pt-5">
          {menus.map((menu, i) => (
            <NavLink to={menu.link} key={i} className={`w-[90%] flex items-center text-sm gap-5 font-medium p-3 transition-transform transform  ${activeLink === menu.link ? "bg-gray-400 text-white rounded-md" : "hover:translate-x-[10px]"}`} onClick={() => handleLinkClick(menu.link)}>
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2 className="pointer-events-none">{menu?.name}</h2>
            </NavLink>
          ))}
        </aside>
        {/* Form */}
        <div className="w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
