import React, { useEffect, useState } from "react";
import { getAllInvoicesService } from "../../../api/apiServices";
import { format } from "date-fns";
import InvoiceDetail from "./InvoiceDetails"; // Import InvoiceDetail component
import useAdminRedirect from "../useAdminRedirect";
const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invoicesPerPage] = useState(5);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  useAdminRedirect();
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getAllInvoicesService();
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm:ss");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getPaymentMethodDisplayName = (method) => {
    switch (method) {
      case "vnpay":
        return "VNPAY";
      case "payUrl":
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

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(invoices.length / invoicesPerPage); i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageNumbers.length;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Quản lý hóa đơn</h2>
      {selectedInvoiceId ? ( // Hiển thị chi tiết hóa đơn nếu có selectedInvoiceId
        <InvoiceDetail
          invoiceId={selectedInvoiceId}
          onGoBack={() => setSelectedInvoiceId(null)}
        />
      ) : (
        <div>
          <table className="min-w-full bg-white border border-gray-300 shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 text-center">ID</th>
                <th className="py-2 text-center">Người Mua</th>
                <th className="py-2 text-center">Tổng số sản phẩm</th>
                <th className="py-2 text-center">Tổng giá trị</th>
                <th className="py-2 text-center">Phương thức thanh toán</th>
                <th className="py-2 text-center">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {currentInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  onClick={() => setSelectedInvoiceId(invoice.id)} // Xác định hóa đơn được chọn
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="py-2 text-center">{invoice.id}</td>
                  <td className="py-2 text-center">{invoice.user_id}</td>
                  <td className="py-2 text-center">{invoice.total_items}</td>
                  <td className="py-2 text-center">
                    {formatCurrency(invoice.total_price)}
                  </td>
                  <td className="py-2 text-center">
                    {getPaymentMethodDisplayName(invoice.payment_method)}
                  </td>
                  <td className="py-2 text-center">
                    {formatDate(invoice.created_at)}
                  </td>
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
              } text-white py-2 px-4 rounded-md focus:outline-none mr-2`}
              onClick={() => paginate(currentPage + 1)}
              disabled={isLastPage}
            >
              Trang sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
