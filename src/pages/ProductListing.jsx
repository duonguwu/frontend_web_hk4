import { BiFilter } from "react-icons/bi";
import loadingGif from "../assets/loading.gif";
import scroll from "../assets/ico-direct.png";
import bannerImg1 from "../assets/2.jpg";
import bannerImg2 from "../assets/3.jpg";
import bannerImg3 from "../assets/4.jpg";
import handleRightImg from "../assets/ico-handleRight.png";
import handleLeftImg from "../assets/ico-handleLeft.png";

import { Filters, SingleProduct, SortBy } from "../components";

import { useProductsContext } from "../contexts";
import { useEffect, useState } from "react";
import { useFilter } from "../hooks/filtersHook";
import { useLocation } from "react-router";

const ProductListing = () => {
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

  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const { loading } = useProductsContext();
  const productsList = useFilter();
  // console.log("Filtered Products:", productsList);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length
      );
    }, 4000);

    return () => clearInterval(intervalTimer);
  }, []);

  useEffect(() => {
    if (location?.state?.from === "category") {
      setIsFilterOpen(true);
    }
  }, []);

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
      {loading ? (
        <div className="h-[70vh] w-full flex items-center justify-center overflow-hidden ">
          <span>
            <img width={250} src={loadingGif} alt="loading..." />
          </span>
        </div>
      ) : (
        <div>
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

          <section className="py-3 flex flex-col md:flex-row gap-2 justify-between">
            <h1 className="text-2xl font-bold">Kính</h1>
            <div className="flex items-center gap-2">
              <Filters
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />
              <SortBy />
              <button
                className={`flex py-1 px-2 rounded-md shadow-md items-center  gap-1 hover:bg-[--primary-text-color] hover:text-white hover:shadow-lg ${
                  isFilterOpen ? "bg-[--primary-text-color] text-white" : ""
                }`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <BiFilter className="text-lg" />
                <span className="text-sm">Bộ lọc</span>
              </button>
            </div>
          </section>

          {productsList.length > 0 ? (
            <main className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {productsList.map((glass) => (
                <SingleProduct key={glass.id} product={glass} />
              ))}
            </main>
          ) : (
            <p className="font-sans text-4xl  font-bold uppercase  tracking-wide text-gray-300 text-center w-full py-32">
              Chưa load dữ liệu
            </p>
          )}

          <button
            className={`bg-white fixed flex bottom-20 right-0 p-2 rounded-full text-xl shadow-2xl transition-all delay-100 ease-in-out ${
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
        </div>
      )}
    </>
  );
};

export default ProductListing;
