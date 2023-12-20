import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { getAllInvoicesDetailsService } from "../../../api/apiServices";

const InvoiceDetail = ({ invoiceId, onGoBack }) => {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoiceDetail = async () => {
      try {
        const response = await getAllInvoicesDetailsService(invoiceId);
        setInvoice(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoiceDetail();
  }, [invoiceId]);
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

  return (
    <div className="bg-white text-gray-800 p-8 rounded-lg shadow-md">
      {invoice ? (
        <div>
          <h2 className="text-4xl mb-4 border-b-2 pb-2 border-gray-400">
            Chi tiết hóa đơn #{invoice.id}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-gray-600">Số lượng sản phẩm:</div>
            <div className="text-gray-600">{invoice.total_items}</div>

            <div className="text-gray-600">Giá thực tế:</div>
            <div className="text-gray-600">
              {formatCurrency(invoice.actual_price)}
            </div>

            <div className="text-gray-600">Tổng giá trị:</div>
            <div className="text-gray-600">
              {formatCurrency(invoice.total_price)}
            </div>

            <div className="text-gray-600">Phương thức thanh toán:</div>
            <div className="text-gray-600">
              {getPaymentMethodDisplayName(invoice.payment_method)}
            </div>

            <div className="text-gray-600">Ngày tạo:</div>
            <div className="text-gray-600">
              {formatDate(invoice.created_at)}
            </div>
          </div>

          {invoice.details.length > 0 && (
            <div>
              <h3 className="text-2xl mt-4 text-gray-600">Chi tiết sản phẩm</h3>
              <div className="mt-4">
                {invoice.details.map((detail) => (
                  <div
                    key={detail.id}
                    className="bg-gray-100 p-4 rounded-md transform hover:scale-105 transition-transform duration-300 shadow-md mb-4"
                  >
                    <div className="flex items-center">
                      <div className="w-1/4">
                        <img
                          src={detail.product.image}
                          alt={detail.product.name}
                          className="w-full h-24 object-cover mb-2 rounded"
                        />
                      </div>
                      <div className="w-3/4 pl-4">
                        <h4 className="text-lg mb-2 text-gray-800">
                          {detail.product.name}
                        </h4>
                        <p className="text-gray-600">
                          Số lượng: {detail.quantity}
                        </p>
                        <p className="text-gray-600">
                          Giá: {formatCurrency(detail.price)}
                        </p>
                        {/* Thêm thông tin khác của sản phẩm nếu cần */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              if (onGoBack) {
                onGoBack();
              }
            }}
            className="mt-8 bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md focus:outline-none"
          >
            Quay lại danh sách hóa đơn
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InvoiceDetail;
