import React, { useState } from "react";

const titleProducts = [
  { title: "Hình ảnh", style: "px-16 py-3 font-bold" },
  { title: "Tên sản phẩm", style: "px-6 py-3" },
  { title: "Số lượng", style: "px-6 py-3" },
  { title: "Giá", style: "px-6 py-3" },
  { title: "Chức năng", style: "px-6 py-3" },
];

const Product = () => {
  // const [activeForm, setActiveForm] = useState(null);

  return (
    <>
      <div className="p-3">
        <a
          href="/#"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-2.5 py-2.5 text-center ml-4">
          + Thêm
        </a>

        {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div> */}

        <div className="m-4 overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                {titleProducts.map((titleProduct, idx) => (
                  <th scope="col" key={idx} className={`${titleProduct.style}`}>
                    {titleProduct.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b hover:bg-gray-50 ">
                <td class="p-4">
                  <img src="" class="w-16 md:w-32 max-w-full max-h-full" alt="" />
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">Yambol</td>
                <td class="px-6 py-4">50</td>
                <td class="px-6 py-4 font-semibold text-gray-900 ">2999.00 đ</td>
                <td class="px-6 py-4">
                  <a
                    href="/#"
                    class="p-1 font-medium text-green-600 border-none bg-green-200 hover:bg-green-300   rounded-md ">
                    Sửa
                  </a>
                  <a
                    href="/#"
                    class="ml-2 p-1 font-medium text-red-600 border-none bg-red-200 hover:bg-red-300 rounded-md">
                    Xóa
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Product;
