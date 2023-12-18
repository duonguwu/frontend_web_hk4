import React, { useEffect } from "react";
import AddressCard from "../address/AddressCard";
import { useCartContext, useProductsContext } from "../../contexts";
import PriceDetailsCard from "./PriceDetailsCard";

const OrderSummary = ({ setOrderData, paymentMethod }) => {
  const { currentAddress } = useProductsContext();
  const { cart, totalPriceOfCartProducts, actualPriceOfCart } =
    useCartContext();
  const totalItems = cart.reduce((acc, { qty }) => acc + qty, 0);

  // Gọi useEffect khi thông tin đơn hàng thay đổi
  useEffect(() => {
    // Tạo danh sách sản phẩm từ giỏ hàng
    const productList = cart.map(({ _id, name, qty, newPrice }) => ({
      productId: _id,
      productName: name,
      quantity: qty,
      price: newPrice,
    }));
    // Thông tin đơn hàng
    const orderData = {
      address: currentAddress,
      totalItems,
      actualPriceOfCart,
      totalPriceOfCartProducts,
      productList,
      paymentMethod,
    };

    // Truyền thông tin đơn hàng vào state
    setOrderData(orderData);
  }, [
    currentAddress,
    totalItems,
    actualPriceOfCart,
    totalPriceOfCartProducts,
    cart,
    setOrderData,
    paymentMethod,
  ]);

  return (
    <div className="px-7  rounded-md shadow-sm bg-gray-50 flex flex-col gap-2 min-w-[25rem] w-full h-min">
      <h1 className="text-sm font-semibold text-gray-700 ms-4">Địa chỉ</h1>
      <AddressCard address={currentAddress} showInput={false} />
      <hr />
      <PriceDetailsCard
        totalItems={totalItems}
        actualPriceOfCart={actualPriceOfCart}
        totalPriceOfCartProducts={totalPriceOfCartProducts}
      />
      <hr />
      <div className="flex justify-between items-center">
        <p className=" text-gray-600">Tổng</p>
        <p className="text-2xl">
          {" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalPriceOfCartProducts)}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
