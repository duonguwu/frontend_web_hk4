import React, { Fragment, useState, useEffect } from "react";

import { useProductsContext } from "../../contexts";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";

const Address = ({ isEdit }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const { addressList, getAddressesService } = useProductsContext();

  // useEffect(() => {
  //   // Gọi getAddressesService để lấy dữ liệu địa chỉ khi component mount
  //   const fetchData = async () => {
  //     try {
  //       const addresses = await getAddressesService();
  //       // Cập nhật địa chỉ trong context
  //       // Note: Đảm bảo rằng địa chỉ đã được set trong context, nếu không useEffect sẽ chạy vô tận
  //       // Nếu data trả về từ API không khớp với định dạng hoặc không có dữ liệu, hãy xử lý nó ở đây
  //     } catch (error) {
  //       // Xử lý lỗi khi gọi API
  //       console.error("Error fetching addresses:", error);
  //     }
  //   };

  //   fetchData();
  // }, [getAddressesService]);
  useEffect(() => {
    getAddressesService();
    console.error("Error fetching addresses:", getAddressesService()); // Gọi hàm để lấy danh sách địa chỉ khi component được tạo
  }, []);
  return (
    <>
      {!isEdit && <h1 className="text-2xl font-bold">Địa chỉ</h1>}
      {showAddressForm && !editAddress ? (
        <AddressForm
          setShowAddressForm={setShowAddressForm}
          editAddress={editAddress}
          setEditAddress={setEditAddress}
        />
      ) : (
        <div className="flex flex-col items-start ">
          <button
            className="btn-rounded-primary text-sm "
            onClick={() => {
              setShowAddressForm(true);
              setEditAddress(false);
            }}
          >
            + Thêm địa chỉ mới
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        {addressList.map((address) => (
          <Fragment key={address.id}>
            {showAddressForm && editAddress?.id === address.id ? (
              <AddressForm
                setShowAddressForm={setShowAddressForm}
                editAddress={editAddress}
                setEditAddress={setEditAddress}
              />
            ) : (
              <AddressCard
                address={address}
                isEdit={isEdit}
                editAddress={editAddress}
                setEditAddress={setEditAddress}
                setShowAddressForm={setShowAddressForm}
              />
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default Address;
