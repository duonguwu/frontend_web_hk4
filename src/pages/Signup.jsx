import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import bannerHero from "../assets/bannerHero.jpg";
import { Logo } from "../components";
import { useAuthContext } from "../contexts";
import { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../utils/utils";

const Signup = () => {
  const { signingUp, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    let id;
    if (isAuthenticated) {
      id = setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [isAuthenticated]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   signupHandler(userDetails);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userDetails.password !== confirmPassword) {
      // Xử lý trường hợp mật khẩu không trùng khớp
      console.error("Password mismatch");
      return;
    }

    try {
      // Sử dụng Axios để gửi yêu cầu đăng ký đến backend
      const response = await axios.post(
        "http://localhost:8000/api/register",
        userDetails
      );
      localStorage.setItem("token", response?.data?.access_token);
      notify("success", "Đăng ký thành công!!");
      navigate("/login");
      // Xử lý kết quả trả về từ backend
      // Đăng nhập người dùng sau khi đăng ký thành công
    } catch (error) {
      console.error(error);
      // Xử lý lỗi và hiển thị thông báo cho người dùng (ví dụ: email đã tồn tại, lỗi định dạng)
      if (error.response) {
        console.log("Server error message:", error.response.data);
      }
    }
  };

  const isDisabled =
    signingUp ||
    !userDetails.name ||
    !userDetails.email ||
    !userDetails.password ||
    !confirmPassword;
  return (
    <main className="grid  grid-rows-1 md:grid-cols-2 w-full  h-screen m-auto ">
      <section className=" hidden md:block max-h-screen  rounded-lg">
        <img src={bannerHero} alt="" className="w-full h-full object-cover" />
      </section>
      <div className="flex items-center justify-center w-full px-5">
        <section className="px-10 py-10 rounded-md shadow-md bg-white/[0.7] flex flex-col gap-6 w-full max-w-lg">
          <Logo />
          <div className="flex flex-col gap-2 ">
            <h1 className="text-4xl font-bold mb-3">Đăng ký</h1>

            <form
              action=""
              className="flex flex-col gap-4 py-5"
              onSubmit={handleSubmit}
            >
              <label className="flex flex-col">
                <input
                  type="text"
                  required
                  placeholder="Username"
                  className="border rounded-md p-1.5 shadow-sm"
                  value={userDetails.name}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="border rounded-md p-1.5 shadow-sm"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                />
              </label>
              <label className="flex flex-col relative">
                <input
                  required
                  placeholder="Mật khẩu"
                  type={showPassword.password ? "text" : "password"}
                  className="border rounded-md p-1.5 shadow-sm"
                  value={userDetails.password}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                />
                <span
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                >
                  {showPassword.password ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </span>
              </label>
              <label className="flex flex-col relative">
                <input
                  required
                  placeholder="Xác nhận mật khẩu"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  className="border rounded-md p-1.5 shadow-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      confirmPassword: !showPassword.confirmPassword,
                    })
                  }
                >
                  {showPassword.confirmPassword ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </span>
                <p
                  className={`pt-1 ${
                    userDetails.password &&
                    confirmPassword &&
                    userDetails.password !== confirmPassword
                      ? "visible text-red-600"
                      : "invisible"
                  }`}
                >
                  Mật khẩu không trùng khớp
                </p>
              </label>
              <div className="w-full py-2   flex flex-col gap-4 items-center">
                <button
                  type="submit"
                  className="btn-primary w-2/3 text-lg text-center"
                  disabled={isDisabled}
                >
                  {signingUp ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                </button>
                <p className="text-gray-600 text-sm">
                  Đã có tài khoản?{" "}
                  <Link
                    to="/login"
                    className="underline text-base
            "
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;
