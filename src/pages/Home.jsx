import { useRef } from "react";
import { Banner, CategoryList, Footer, Trending } from "../components";
import scroll from "../assets/ico-direct.png";
import { useEffect, useState } from "react";

const Home = () => {
  const catRef = useRef(null);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

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
