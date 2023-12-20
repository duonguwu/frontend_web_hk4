import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../contexts";
import { format } from "date-fns";

const InvoiceList = ({ onSelectInvoice }) => {
  const [invoices, setInvoices] = useState([]);
  const { token } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(3);

  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    if (token) {
      const fetchInvoices = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/user/getInvoices",
            {
              headers: {
                authorization: token,
              },
            }
          );
          setInvoices(response.data);
        } catch (error) {
          console.error("Error fetching invoices:", error);
        }
      };

      fetchInvoices();
    }
  }, [token]);

  useEffect(() => {
    // Cập nhật trạng thái của nút "Trang trước"
    setIsFirstPage(currentPage === 1);

    // Cập nhật trạng thái của nút "Trang sau"
    const indexOfLastInvoice = currentPage * invoicesPerPage;
    setIsLastPage(indexOfLastInvoice >= invoices.length);
  }, [currentPage, invoices, invoicesPerPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };
  const getPaymentMethodDisplayName = (method) => {
    switch (method) {
      case "vnpay":
        return "VNPAY";
      case "momo":
        return "MoMo";
      case "metamask":
        return "Metamask";
      case "cashOnDelivery":
        return "Thanh toán khi nhận hàng";
      default:
        return method;
    }
  };
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = invoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Danh sách hóa đơn của bạn</h2>
      <ul>
        {currentInvoices.map((invoice) => (
          <li
            key={invoice.id}
            className="bg-white shadow-md p-4 mb-4 rounded-md transition duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => onSelectInvoice(invoice.id)}
          >
            <div className="text-blue-500 hover:underline focus:outline-none">
              Hóa đơn #{invoice.id}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-gray-600">
                <p>
                  <span className="font-semibold">Số lượng sản phẩm:</span>
                </p>
                <p>
                  <span className="font-semibold">Giá thực tế:</span>
                </p>
                <p>
                  <span className="font-semibold">Tổng giá trị:</span>
                </p>
                <p>
                  <span className="font-semibold">Phương thức thanh toán:</span>
                </p>
                <p>
                  <span className="font-semibold">Ngày tạo:</span>
                </p>
              </div>
              <div className="text-gray-600">
                <p>{invoice.total_items}</p>
                <p>{formatCurrency(invoice.actual_price)}</p>
                <p>{formatCurrency(invoice.total_price)}</p>
                <p>{getPaymentMethodDisplayName(invoice.payment_method)}</p>
                <p>{formatDate(invoice.created_at)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
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
  );
};

export default InvoiceList;
