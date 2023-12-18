import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";
import spinningLoader from "../../assets/spinning-circles.svg";
import OrderSummary from "./OrderSummary";
import { useAuthContext, useCartContext } from "../../contexts";
import appLogo from "../../assets/thugGlasses.png";
import { useNavigate } from "react-router";
// import { handlePayment } from "../checkout/PaymentMethod";

const Modal = ({
  showModal,
  setShowModal,
  handlePlaceOrder,
  paymentMethod,
}) => {
  const { token } = useAuthContext();
  // const { clearCart, totalPriceOfCartProducts } = useCartContext();
  const [disableBtn, setDisableBtn] = useState(false);
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState(null);

  const clickHandler = async () => {
    setDisableBtn(true);
    try {
      console.log("tesst:", paymentMethod);
      // const selectedPaymentMethod = await handlePayment(paymentMethod);
      setShowModal(false);
      setDisableBtn(false);
      handlePlaceOrder(orderData, paymentMethod, token);
    } catch (error) {
      console.error("Error handling payment:", error);
      setDisableBtn(false);
    }
  };
  const loadScript = async (url) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = url;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="transition justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Đơn hàng</h3>
                  <button className="p-1" onClick={() => setShowModal(false)}>
                    <AiOutlineClose />
                  </button>
                </div>

                <OrderSummary
                  setOrderData={setOrderData}
                  paymentMethod={paymentMethod}
                />

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    disabled={disableBtn}
                    className="btn-rounded-primary w-1/2  text-sm ease-linear transition-all duration-150 h-10 flex justify-center items-center
                    disabled:cursor-wait"
                    type="button"
                    onClick={clickHandler}
                  >
                    {disableBtn ? (
                      <img src={spinningLoader} alt="" height={20} />
                    ) : (
                      <span>Thanh toán</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
