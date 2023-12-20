import { useState, useEffect } from "react";
import { FaMoneyBillAlt, FaCreditCard, FaMobileAlt } from "react-icons/fa";
import vnpay_logo from "../../assets/vnpay_logo.png";
import momo_logo from "../../assets/momo.jpg";
import metamask_logo from "../../assets/MetaMask_Fox.png";
import { useCartContext, useAuthContext } from "../../contexts";
import { processPaymentService } from "../../api/apiServices";

const PaymentMethodSelect = ({
  paymentMethod,
  setPaymentMethod,
  onPaymentMethodSelected,
}) => {
  const { dispatch } = useCartContext();
  const [isPaymentProcessing, setPaymentProcessing] = useState(false);
  const { token } = useAuthContext();
  //const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePayment = async (selectedPaymentMethod) => {
    try {
      setPaymentProcessing(true);
      const paymentData = {
        paymentMethod: selectedPaymentMethod,
        // Thêm bất kỳ thông tin thanh toán cụ thể khác nếu cần
      };
      console.log("data", paymentData);
      console.log("token", token);
      return selectedPaymentMethod;
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error("Payment error:", error);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const paymentMethods = [
    {
      value: "cashOnDelivery",
      label: "Thanh toán khi nhận hàng",
      image: <FaMoneyBillAlt size={24} />,
    },
    {
      value: "vnpay",
      label: "VNPay",
      image: <img src={vnpay_logo} alt="VNPay" />,
    },
    {
      value: "payUrl",
      label: "Momo",
      image: <img src={momo_logo} alt="Momo" />,
    },
    {
      value: "MetaMask",
      label: "MetaMask",
      image: <img src={metamask_logo} alt="MetaMask" />,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Phương thức thanh toán</h1>
      <label className="block text-sm font-medium text-gray-700">
        Chọn phương thức thanh toán:
      </label>
      <br />
      <div className="flex flex-col gap-6">
        {paymentMethods.map((method) => (
          <div
            key={method.value}
            onClick={() => {
              //setSelectedPaymentMethod(method.value);
              // handlePayment(method.value);
              // setPaymentMethod(method.value);
              handlePayment(method.value).then((selectedMethod) => {
                onPaymentMethodSelected(selectedMethod);
                setPaymentMethod(selectedMethod);
              });
            }}
            className={`cursor-pointer p-4 rounded-md shadow-md bg-white/[0.6] mb-2 max-w-xl ${
              paymentMethod === method.value
                ? "border-2 border-[--primary-text-color]"
                : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-black/[0.075] rounded-md flex items-center justify-center">
                {method.image}
              </div>
              <h2 className="text-xl font-semibold">{method.label}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelect;
