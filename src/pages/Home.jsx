import { useRef } from "react";
import { Banner, CategoryList, Footer, Trending } from "../components";
import scroll from "../assets/ico-direct.png";
import { useEffect, useState } from "react";

import bannerImg1 from "../assets/mat viet (1).png";
import bannerImg2 from "../assets/mat viet h.png";
import bannerImg3 from "../assets/mat viet.png";
import handleRightImg from "../assets/ico-handleRight.png";
import handleLeftImg from "../assets/ico-handleLeft.png";

const Home = () => {
  const catRef = useRef(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const bannerImages = [bannerImg1, bannerImg2, bannerImg3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleLeft = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length
    );
  };

  const handleRight = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const toggleShowArrow = () => {
      if (window.scrollY > 300) {
        setShowScrollArrow(true);
      } else {
        setShowScrollArrow(false);
      }
    };
    window.addEventListener("scroll", toggleShowArrow);

    return () => {
      window.removeEventListener("scroll", toggleShowArrow);
    };
  }, []);

  return (
    <>
      <Banner catRef={catRef} />
      <div>
        {" "}
        <h1 className="text-3xl md:text-4xl break-words text-center mt-10">
          Ưu đãi ngập tràn, rộn ràng đón tết
        </h1>
        <header className="mb-3 relative flex">
          <img
            src={bannerImages[currentImageIndex]}
            alt="bannerImg"
            className="rounded-md w-full min-h-[10rem] object-cover"
          />
          <button
            onClick={handleLeft}
            className="w-7 h-7 m-2 absolute left-0 top-1/2 -translate-y-1/2"
          >
            <img src={handleLeftImg} alt="" />
          </button>
          <button
            onClick={handleRight}
            className="w-7 h-7 m-2 absolute right-0 top-0 top-1/2 -translate-y-1/2"
          >
            <img src={handleRightImg} alt="" />
          </button>
        </header>
      </div>
      <CategoryList catRef={catRef} />
      <br />
      <Trending />
      <br />
      <Footer />
      <button
        className={` fixed flex bg-white bottom-20 right-0 p-2 rounded-full text-xl shadow-2xl transition-all delay-100 ease-in-out ${
          showScrollArrow ? "block" : "hidden"
        }`}
        style={{ transform: "rotate(90deg)" }}
        onClick={scrollToTop}
      >
        <img
          src={scroll}
          alt=""
          className="w-5 h-5"
          style={{ transform: "rotate(180deg)" }}
        />{" "}
        Về đầu trang
      </button>
    </>
  );
};

export default Home;
