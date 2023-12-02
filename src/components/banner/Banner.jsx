import { BsArrowDownRightCircle } from "react-icons/bs";
import React from 'react';
import bannerImg from "../../assets/1.jpg";
import { useNavigate } from "react-router";

const Banner = ({ catRef }) => {
  const navigate = useNavigate();

  return (
    <main className="w-full">
      <div className="w-full justify-between items-center mb-1 relative">
        <section className="w-full mx-auto sm:mx-0">
          <div className="absolute top-0 left-0 w-full h-full rounded-xl bg-black/[0.2]"></div>
          <img src={bannerImg} alt="bannerImg" className=" w-full rounded-xl z-20" />
          <section className=" items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <button
              className="btn-primary lg:text-3xl md:text-sm"
              onClick={() => navigate("/products")}
            >
             Mua sắm ngay
            </button>
            <div className="pt-2 flex items-center justify-center">
            <button
              className="pt-2 flex items-center"
              onClick={() =>
                catRef.current.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              <span className="text-xl lg:text-2xl sm:text-sm pr-2">Khám phá thêm</span>{" "}
              <BsArrowDownRightCircle className="text-lg" />
            </button>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Banner;
