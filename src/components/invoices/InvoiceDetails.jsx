import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../contexts";

const InvoiceDetail = ({ invoiceId }) => {
  const [invoice, setInvoice] = useState(null);
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      // Gọi API để lấy chi tiết hóa đơn dựa trên invoiceId
      const fetchInvoiceDetail = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/user/getInvoices/${invoiceId}`,
            {
              headers: {
                authorization: token,
              },
            }
          ); // Thay đổi URL tương ứng với API của bạn
          setInvoice(response.data);
        } catch (error) {
          console.error("Error fetching invoice detail:", error);
        }
      };

      fetchInvoiceDetail();
    }
  }, [token, invoiceId]);

  return (
    <div>
      {invoice ? (
        <div>
          <h2>Chi tiết hóa đơn #{invoice.id}</h2>
          {/* Hiển thị thông tin chi tiết hóa đơn */}
          {/* Ví dụ: invoice.address, invoice.total_items, invoice.products, ... */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default InvoiceDetail;
