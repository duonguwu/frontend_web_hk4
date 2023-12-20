import React, { useState, useEffect, useReducer } from "react";
import { useProductsContext, useAuthContext } from "../../contexts";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { newAddresses } from "../../api/apiServices";
import { productsReducer, initialState } from "../../reducers/productsReducer";
import { addressTypes } from "../../utils/actionTypes";

const AddressForm = ({ setShowAddressForm, editAddress, setEditAddress }) => {
  const { addAddress, setCurrentAddress, updateAddress } = useProductsContext();
  const [newAddress, setNewAddress] = useState(
    editAddress
      ? editAddress
      : {
          id: uuid(),
          fullname: "",
          mobile: "",
          flat: "",
          area: "",
          city: "",
          pincode: "",
        }
  );
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { token } = useAuthContext();
  const [state, dispatch] = useReducer(productsReducer, initialState);
  useEffect(() => {
    // Lấy dữ liệu tỉnh thành từ API
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
  }, []);

  const handleCityChange = (selectedCityId) => {
    // Lọc dữ liệu quận huyện dựa trên tỉnh thành được chọn
    const selectedCity = cities.find((city) => city.Id === selectedCityId);
    setDistricts(selectedCity ? selectedCity.Districts : []);
  };

  const handleAddress = async (data, token) => {
    console.log("data adress", data);
    console.log("data token", token);
    try {
      const addresserere = await newAddresses(data, token);
      dispatch({
        type: addressTypes.ADD_ADDRESS,
        payload: [newAddress, ...state.addressList],
      });
      console.log("addresserere addresserere", addresserere);
    } catch (error) {
      console.error("Error during API request:", error);
      if (error.response) {
        // Request was made and server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("No response received");
      } else {
        // Something happened in setting up the request
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Chuyển đổi giá trị city và area về dạng chuỗi
    const cityString =
      cities.find((city) => city.Id === newAddress.city)?.Name || "";
    const areaString =
      districts.find((district) => district.Id === newAddress.area)?.Name || "";

    // Tạo một bản sao của newAddress với giá trị city và area được cập nhật
    const updatedAddress = {
      ...newAddress,
      city: cityString,
      area: areaString,
    };
    console.log("updatedAddress", updatedAddress);

    // Sử dụng giá trị chuỗi trong updatedAddress
    if (editAddress) {
      updateAddress(updatedAddress.id, updatedAddress);
    } else {
      addAddress(updatedAddress);
      setCurrentAddress(updatedAddress);
    }
    handleAddress(updatedAddress, token);
    setShowAddressForm(false);
  };

  return (
    <form
      action=""
      className="flex flex-col gap-3 p-5 bg-gray-50 shadow-sm"
      onSubmit={submitHandler}
    >
      <div className="flex gap-2 flex-wrap">
        <label className="flex flex-1 flex-col">
          Họ và tên
          <input
            required
            type="text"
            className="border rounded-md p-1.5 shadow-sm"
            onChange={(e) =>
              setNewAddress({ ...newAddress, fullname: e.target.value })
            }
            value={newAddress.fullname}
          />
        </label>
        <label className="flex flex-1 flex-col">
          Số điện thoại
          <input
            required
            type="number"
            className="border rounded-md p-1.5 shadow-sm"
            onChange={(e) =>
              setNewAddress({ ...newAddress, mobile: e.target.value })
            }
            value={newAddress.mobile}
          />
        </label>
      </div>
      <label className="flex flex-col">
        Địa chỉ nhà
        <input
          required
          type="text"
          className="border rounded-md p-1.5 shadow-sm"
          onChange={(e) =>
            setNewAddress({ ...newAddress, flat: e.target.value })
          }
          value={newAddress.flat}
        />
      </label>
      <label className="flex flex-1 flex-col">
        Thành Phố/Tỉnh
        <select
          required
          className="border rounded-md p-1.5 shadow-sm"
          onChange={(e) =>
            setNewAddress({ ...newAddress, city: e.target.value })
          }
          value={newAddress.city}
          onBlur={(e) => handleCityChange(e.target.value)}
        >
          <option value="" selected disabled>
            Chọn tỉnh thành
          </option>
          {cities.map((city) => (
            <option key={city.Id} value={city.Id}>
              {city.Name}
            </option>
          ))}
        </select>
      </label>
      <div className="flex gap-2 flex-wrap">
        <label className="flex flex-1 flex-col">
          Quận/Huyện
          <select
            required
            className="border rounded-md p-1.5 shadow-sm"
            onChange={(e) =>
              setNewAddress({ ...newAddress, area: e.target.value })
            }
            value={newAddress.area}
          >
            <option value="" selected disabled>
              Chọn quận huyện
            </option>
            {districts.map((district) => (
              <option key={district.Id} value={district.Id}>
                {district.Name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col">
          Mã bưu điện
          <input
            required
            type="number"
            className="border rounded-md p-1.5 shadow-sm"
            onChange={(e) =>
              setNewAddress({ ...newAddress, pincode: e.target.value })
            }
            value={newAddress.pincode}
          />
        </label>
      </div>

      <div className="flex gap-3 mt-3 flex-wrap">
        {!editAddress && (
          <button
            type="button"
            className="btn-rounded-secondary rounded-full flex items-center gap-2 text-sm p-1"
            onClick={() => {
              setNewAddress({
                id: uuid(),
                fullname: "Nguyễn Dương",
                mobile: "0327879401",
                flat: "KTX Khu B - ĐHQG TP.HCM",
                area: "phường Linh Trung - Thủ Đức",
                city: "Hồ Chí Minh",
                pincode: "090909",
              });
              if (editAddress) {
                setEditAddress(null);
              }
            }}
          >
            Địa chỉ ảo
          </button>
        )}
        <button
          type="button"
          className="btn-rounded-secondary rounded-full flex items-center gap-2 text-sm"
          onClick={() => {
            setShowAddressForm(false);
            setNewAddress({
              fullname: "",
              mobile: "",
              flat: "",
              area: "",
              city: "",
              pincode: "",
            });
            if (editAddress) {
              setEditAddress(null);
            }
          }}
        >
          Hủy bỏ
        </button>
        <button
          type="submit"
          className="btn-rounded-primary rounded-full flex items-center gap-2 text-sm"
        >
          Lưu
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
