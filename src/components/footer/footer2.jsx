import React, { useState } from "react";
import address from "../../assets/ico-address.png";
import mail from "../../assets/ico-mail.png";
import phone from "../../assets/ico-phone.png";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://open-sg.larksuite.com/anycross/trigger/callback/MDE4NjNkZWM1ZTBjYjE1MWI4MzQ1ZDU3ZjVkMzlmYWE3", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: `${formData.name} + ${formData.phoneNumber}`,
      });

      if (response.ok) {
        setIsSubmitSuccess(true);
        console.log("Form data submitted:", formData);

        setFormData({
          phoneNumber: "",
          name: "",
        });
      } else {

        console.error("Form data submission failed:", response.statusText);
        setIsSubmitSuccess(false);
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
      setIsSubmitSuccess(false);
    } finally {
      setIsButtonClicked(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col bg-blue-50 justify-center items-center absolute right-0 left-0 px-4">
      <h2 className="text-2x1 md:text-2xl mt-4 text-blue-900">
        <b>CÔNG TY TNHH MATVIET - Nhóm 2</b>
      </h2>
      <ul className="flex flex-row gap-1 md:gap-20 py-4">
        <li className="flex-1">
          <b>VỀ CHÚNG TÔI</b>
          <ul>
            <li>Nguyễn Dương</li>
            <li>Nguyễn Duy Đạt</li>
            <li>Nguyễn Phước Huy</li>
            <li>Nguyễn Thị Tường Vi</li>
            <li>Trần Hạnh Thảo</li>
            <li>Lê Thuận Hiếu</li>
          </ul>
        </li>
        <li className="flex-1">
          <b>HỖ TRỢ KHÁCH HÀNG</b>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Tên"
              value={formData.name}
              onChange={handleInputChange}
              className="my-2 p-2"
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Số điện thoại"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="my-2 p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
              Gửi
            </button>
            {isButtonClicked && isSubmitSuccess && (
              <p className="text-green-600 mt-2">Thông tin đã được gửi thành công!</p>
            )}
          </form>
        </li>
        <li className="flex-1">
          <b>THÔNG TIN LIÊN LẠC</b>
          <ul>
            <li className="flex">
              <img src={phone} alt="" className="w-5 h-5 mr-1" />
              <a href="tel:0327879401" className="text-blue-800">
                {" "}
                0327879401
              </a>
            </li>
            <li className="flex">
              <img src={address} alt="" className="w-5 h-5 mr-1" />{" "}
              <a
                className="text-blue-800"
                href="https://maps.app.goo.gl/YtRjT7ykK77zJL2G8"
              >
                {" "}
                Đại học Công nghệ thông tin
              </a>
            </li>
            <li className="flex">
              <img src={mail} alt="" className="w-5 h-5 mr-1" />
              <a className="text-blue-800" href="mailto:matkinhviet@gmail.com">
                matkinhviet@gmail.com
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
