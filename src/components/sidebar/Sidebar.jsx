import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation } from "react-router-dom";
import { Logo } from "..";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { RiBuilding3Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { useAuthContext } from "../../contexts";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();
  const [loggingOut, setLoggingOut] = useState(false);
  const { logoutHandler } = useAuthContext();
  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);
  const handleLogOut = () => {
    setLoggingOut(true);
    setTimeout(() => {
      logoutHandler();
      setLoggingOut(false);
    }, 1000);
  };
  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [isTabletMid, pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const MenuItem = ({ icon, text, to }) => (
    <li>
      <NavLink to={to} className="link">
        {icon}
        {open && <span>{text}</span>}
      </NavLink>
    </li>
  );

  return (
    <div className="h-[100vh] sticky top-0">
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        }`}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-white text-gray shadow-xl z-[999] max-w-[16rem] w-[16rem] overflow-hidden md:relative fixed h-screen "
      >
        <div className="flex justify-center items-center gap-2.5 font-medium border-b py-3 border-slate-300 mx-3">
          <div className={`${open ? "" : "hidden"}`}>
            <Logo />
          </div>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <MenuItem
              icon={<AiOutlineAppstore size={23} />}
              text="Sản phẩm"
              to="/adminproduct"
            />
            <MenuItem
              icon={<BsPerson size={23} />}
              text="Khách hàng"
              to="/admincustomer"
            />
            <MenuItem
              icon={<RiBuilding3Line size={23} />}
              text="Hóa đơn"
              to="/admininvoice"
            />
            <MenuItem
              icon={<TbReportAnalytics size={23} />}
              text="Thống kê"
              to="/admindashboard"
            />
          </ul>
          {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Admin name</p>
                </div>
                <button
                  disabled={loggingOut}
                  onClick={handleLogOut}
                  className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl"
                >
                  {loggingOut ? "Logging Out..." : "Logout"}
                </button>
              </div>
            </div>
          )}
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: 0,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden" onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
