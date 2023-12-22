import React, { useEffect, useState } from "react";
import { getAllUsersService } from "../../../api/apiServices";
import { format } from "date-fns";
import useAdminRedirect from "../useAdminRedirect";

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  useAdminRedirect();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsersService();
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-4">
        Danh sách khách hàng
      </h2>
      <div className="overflow-x-auto shadow-lg overflow-y-scroll">
        <table className="min-w-full bg-white border rounded-md">
          <thead className="text-sm text-gray-700 bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 text-center">ID</th>
              <th className="py-2 px-4 text-center">Name</th>
              <th className="py-2 px-4 text-center">Email</th>
              <th className="py-2 px-4 text-center">Created at</th>
              {/* Thêm các cột khác nếu cần */}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 text-center border-b">{user.id}</td>
                <td className="py-2 px-4 text-center border-b">{user.name}</td>
                <td className="py-2 px-4 text-center border-b">{user.email}</td>
                <td className="py-2 px-4 text-center border-b">
                  {formatDate(user.created_at)}
                </td>
                {/* Thêm các ô khác tương ứng với dữ liệu user */}
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
    </div>
  );
};

export default Customer;
