import React from "react";
import address from "../../assets/ico-address.png";
import mail from "../../assets/ico-mail.png";
import phone from "../../assets/ico-phone.png";

const Footer = () => {
  return (
  <div className="flex flex-col bg-blue-50 justify-center items-center absolute right-0 left-0 px-4">
    <h2 className="text-2x1 md:text-2xl mt-4 text-blue-900"><b>CÔNG TY TNHH MATVIET - Nhóm 2</b></h2>
      <ul className="flex flex-row gap-1 md:gap-20 py-4">
        <li className="flex-1"><b>VỀ CHÚNG TÔI</b>
          <ul>
            <li>Nguyễn Dương</li>
            <li>Nguyễn Duy Đạt</li>
            <li>Nguyễn Phước Huy</li>
            <li>Nguyễn Thị Tường Vi</li>
            <li>Trần Hạnh Thảo</li>
          </ul>
        </li>
        <li className="flex-1"><b>HỖ TRỢ KHÁCH HÀNG</b>
        
        </li>
        <li className="flex-1"><b>THÔNG TIN LIÊN LẠC</b>
          <ul>
            <li className="flex"><img src={phone} alt="" className="w-5 h-5 mr-1"/> 
            <a href="" className="text-blue-800"> 1400.0041</a>
            </li>
            <li className="flex">
              <img src={address} alt="" className="w-5 h-5 mr-1"/>  <a className="text-blue-800" href="https://maps.app.goo.gl/YtRjT7ykK77zJL2G8"> Đại học Công nghệ thông tin</a></li>
            <li className="flex">
              <img src={mail} alt="" className="w-5 h-5 mr-1"/> 
              <a className="text-blue-800" href="">Doan@gmail.com</a></li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
