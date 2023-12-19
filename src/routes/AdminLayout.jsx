import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <div>
      <div className="flex gap-[10px]">
        <Sidebar />
        <div className="w-full mx-auto p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
