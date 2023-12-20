import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useCartContext } from "../../contexts";
import { notify } from "../../utils/utils";

function PaymentResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCartContext();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const params = queryString.parse(location.search);

    // Lấy thông tin từ URL
    const vnp_TransactionStatus = params["vnp_TransactionStatus"];

    const momo_TransactionStatus = params["resultCode"];
    // Kiểm tra trạng thái giao dịch resultCode=0
    if (vnp_TransactionStatus === "00") {
      // Thực hiện các hành động sau khi đặt hàng thành công
      setPaymentStatus("success");
    } else if (momo_TransactionStatus === "0") {
      setPaymentStatus("success");
    } else {
      setPaymentStatus("failed"); // Giao dịch không thành công
    }
  }, [location, navigate, clearCart]);

  useEffect(() => {
    if (paymentStatus === "success") {
      clearCart();
      notify("info", "Đơn hàng của bạn đã được đặt thành công!");
      navigate("/orders", { state: "orderSuccess" });
    } else if (paymentStatus === "failed") {
      navigate("/orders", { state: "orderNotSuccess" });
    }
  }, [paymentStatus, navigate]);

  return null; // Không hiển thị gì trong khi chờ xử lý
}

export default PaymentResult;
