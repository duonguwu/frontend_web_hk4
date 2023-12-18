// Checkout.jsx
import { useEffect, useState } from "react";
import { SummaryCard } from "../components";
import Address from "../components/address/Address";
import { useLocation, useNavigate } from "react-router";
import Modal from "../components/checkout/Modal";
import { useCartContext, useCheckoutContext } from "../contexts"; // Thêm import này
import PaymentMethodSelect from "../components/checkout/PaymentMethod";
import { placeOrderService } from "../api/apiServices";
import { notify } from "../utils/utils";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartContext();
  const [showModal, setShowModal] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const { state, dispatch } = useCheckoutContext();
  const [orderSummaryData, setOrderSummaryData] = useState(null);

  const handlePaymentMethodSelect = (selectedMethod) => {
    setPaymentMethod(selectedMethod);
  };

  useEffect(() => {
    if (location?.state !== "cart" || !cart.length) {
      navigate("/");
    }
  }, []);

  const handlePlaceOrder = async (data, paymentMethod, token) => {
    try {
      console.log("data", data);
      console.log("token", token); // trả về null, mai check chỗ này
      const orderResponse = await placeOrderService(data, paymentMethod, token);

      console.log("Order placed successfully!", orderResponse);

      // Thực hiện các hành động sau khi đặt hàng thành công
      clearCart();
      notify("info", "Đơn hàng của bạn đã được đặt thành công!");
      navigate("/orders", { state: "orderSuccess" });
    } catch (err) {
      console.error("Error placing order:", err.message);
      notify(
        "error",
        err?.response?.data?.errors
          ? err?.response?.data?.errors[0]
          : err?.response?.data?.message
      );
    }
  };

  return (
    <>
      <div className="md:min-h-[80vh] flex justify-center items-center py-3">
        <main className="grid md:grid-cols-2 gap-10 w-full">
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            handlePlaceOrder={handlePlaceOrder}
            paymentMethod={paymentMethod}
            //handlePayment={handlePayment}
          />
          <section className="p-7 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-6 w-full h-min">
            <Address />
            <PaymentMethodSelect
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onPaymentMethodSelected={handlePaymentMethodSelect}
            />
          </section>
          <SummaryCard setShowModal={setShowModal} />
        </main>
      </div>
    </>
  );
};

export default Checkout;
