import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../contexts";

const InvoiceList = ({ onSelectInvoice }) => {
  const [invoices, setInvoices] = useState([]);
  const { token } = useAuthContext();

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

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Danh sách hóa đơn của bạn</h2>
      <ul>
        {invoices.map((invoice) => (
          <li
            key={invoice.id}
            className="bg-white shadow-md p-4 mb-4 rounded-md transition duration-300 transform hover:scale-105"
          >
            <button
              onClick={() => onSelectInvoice(invoice.id)}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Hóa đơn #{invoice.id}
            </button>
            <p className="text-gray-600">
              Actual Price:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(invoice.actual_price)}
            </p>
            <p className="text-gray-600">
              Actual Price:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(invoice.actual_price)}
            </p>
            <p className="text-gray-600">
              Total Price:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(invoice.total_price)}
            </p>
            <p className="text-gray-600">
              Payment Method: {invoice.payment_method}
            </p>
            <p className="text-gray-600">Created At: {invoice.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
